const fs = require('fs')
const DATABASE = 'natura-flora-20190221.json'
//node renderData
renderData(DATABASE)
function renderData(listData) {
    fs.readFile(listData, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            data = JSON.parse(data)

            data.plantes.map((plante) => {
                if (plante.produits_associes) {
                    plante.produits_associes = plante.produits_associes.split(",")
                    //console.log(plante.produits_associes)
                }
            })
            const plantesKeywords = renderKeyword(data.plantes)
            const produitsKeywords = renderKeyword(data.produits)
            let listKeywords = plantesKeywords.concat(produitsKeywords)
            listKeywords = Array.from(new Set(listKeywords))
            listKeywords.sort()
            listKeywords = formatSymptomes(listKeywords)
            const listGlossaire = glossaireFormat(data.glossaire)
            writeData('symptom.json', listKeywords)
            writeData('glossaire.json', listGlossaire)
            writeData('plantes.json', data.plantes)
            writeData('produits.json', data.produits)
            writeData('progres.json', data.progres)
            writeData('profilstypes.json', data.profilstypes_associated)
            writeData('route.json', data.navigation)
            writeData('register.json', data.register)
            writeData('specialties.json', data.specialties)
        }
    });
}
function writeData(fileNAME, dataObject) {
    dataObject = JSON.stringify(dataObject)//convert it back to json
    fs.writeFile(fileNAME, dataObject, 'utf8', function (err) {
        if (err) throw err;
        console.log('--------------------------------------------- Write COMPLETE', fileNAME);
    });
}

function renderKeyword(listData) {
    const listKeywords = []
    listData.map((data) => {
        let listKeyword = data.keyword
        if (listKeyword && listKeyword.length > 0) {
            listKeyword = listKeyword.split(",")
            listKeyword.map((keyword) => {
                keyword = keyword.toLowerCase()
                keyword = keyword.replace(" -", "-")
                keyword = keyword.replace("- ", "-")
                keyword = keyword.replace(" - ", "-")
                keyword = keyword.replace("-", " - ")
                listKeywords.push(keyword)
            })
        }
    })
    return listKeywords
}
function formatSymptomes(dataList) {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('')
    const dataRow = []
    alphabet.map((currentChar) => {
        const listOfCurrentChar = dataList.filter((item) => item.toUpperCase().indexOf(currentChar) === 0)
        if (listOfCurrentChar.length > 0) {
            dataRow.push({
                isHeader: true,
                text: currentChar
            })
            listOfCurrentChar.map((item) => {
                dataRow.push({
                    isHeader: false,
                    text: item
                })
            })
        }
    })
    return dataRow
}
function glossaireFormat(dataList) {
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('')
    const dataRow = []
    alphabet.map((currentChar) => {
        const listOfCurrentChar = dataList.filter((item) => item.glossaire.toUpperCase().indexOf(currentChar) === 0)
        if (listOfCurrentChar.length > 0) {
            dataRow.push({
                isHeader: true,
                text: currentChar
            })
            listOfCurrentChar.map((item) => {
                dataRow.push({
                    isHeader: false,
                    glossaire: item.glossaire,
                    descript: item.descript
                })
            })
        }
    })
    return dataRow
}
