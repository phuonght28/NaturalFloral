const excelToJson = require('convert-excel-to-json');
const jsonfile = require('jsonfile')
const fs = require('fs')

const date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();


const FILE_EXCEL = 'Flora_Natura_Database.xlsx'
const FILE_OUTPUT = `${year}${month}${date}.json`
const DATABASE = FILE_OUTPUT

const result = excelToJson({
    sourceFile: FILE_EXCEL,
    header: { rows: 1 },
    columnToKey: { '*': '{{columnHeader}}' }
});
jsonfile.writeFile(FILE_OUTPUT, result, 'utf8', function (err) {
    if (err) throw err;
    //console.log('----------------------------------------- convert-excel-to-json COMPLETE', FILE_OUTPUT);
});

function renderKeyword(listData) {
    const listKeywords = []
    listData.map((data) => {
        let listKeyword = data.keyword
        if (listKeyword && listKeyword.length > 0) {
            listKeyword = listKeyword.split(",")
            listKeyword.map((keyword) => {
                keyword = keyword.toLowerCase()
                keyword = keyword.replace(" -", "-").replace("- ", "-").replace(" - ", "-").replace("-", " - ")
                listKeywords.push(keyword)
            })
        }
    })
    return listKeywords
}
renderData(DATABASE)
//node renderData
function renderData(listData) {
    fs.readFile(listData, 'utf8', function readFileCallback(err, data) {
        if (err) {
            //console.log(err); 
        }
        else {
            data = JSON.parse(data)

            const plantesKeywords = []
            data.plantes.map((plante) => {
                if (plante.produits_associes) {
                    plante.produits_associes = plante.produits_associes.split(",")
                }
                if (plante.indication) {
                    plante.indication = plante.indication.replace(/,/g, '\n');
                }
                if (plante.proprietes) {
                    plante.proprietes = plante.proprietes.replace(/,/g, '\n');
                }
                if (plante.keyword) {
                    plante.keyword = plante.keyword.split(",")
                    plante.keyword.map((keyword) => {
                        keyword = keyword.toLowerCase()
                        keyword = keyword.replace(" -", "-")
                        keyword = keyword.replace("- ", "-")
                        keyword = keyword.replace(" - ", "-")
                        keyword = keyword.replace("-", " - ")
                        plantesKeywords.push(keyword)
                    })
                }
            })
            const produitsKeywords = []
            data.produits.map((produit) => {
                if (produit.keyword) {
                    produit.keyword = produit.keyword.split(",")
                    produit.keyword.map((keyword) => {
                        keyword = keyword.toLowerCase()
                        keyword = keyword.replace(" -", "-")
                        keyword = keyword.replace("- ", "-")
                        keyword = keyword.replace(" - ", "-")
                        keyword = keyword.replace("-", " - ")
                        produitsKeywords.push(keyword)
                    })
                }
            })
            // const plantesKeywords = renderKeyword(data.plantes)
            // const produitsKeywords = renderKeyword(data.produits)
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
        //console.log('----------------------------------------- Write COMPLETE', fileNAME);
    });
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
