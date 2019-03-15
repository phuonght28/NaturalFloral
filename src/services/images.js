/* eslint-disable global-require */

import { Asset } from 'expo'
const commonImages = [
  { name: 'unknow', uri: require('../resources/images/unknow.png') },
  { name: 'no-image', uri: require('../resources/images/no-image.png') },
  { name: 'start', uri: require('../resources/images/icon-favorite.png') }
]

const produitsImages = [
  { id: 3760265300013, img: require('../resources/images/produits/3760265300013.png') },
  { id: 3760265300020, img: require('../resources/images/produits/3760265300020.png') },
  { id: 3760265300037, img: require('../resources/images/produits/3760265300037.png') },
  { id: 3760265300044, img: require('../resources/images/produits/3760265300044.png') },
  { id: 3760265300051, img: require('../resources/images/produits/3760265300051.png') },
  { id: 3760265300068, img: require('../resources/images/produits/3760265300068.png') },
  { id: 3760265300075, img: require('../resources/images/produits/3760265300075.png') },
  { id: 3760265300082, img: require('../resources/images/produits/3760265300082.png') },
  { id: 3760265300099, img: require('../resources/images/produits/3760265300099.png') },
  { id: 3760265300105, img: require('../resources/images/produits/3760265300105.png') },
  { id: 3760265300112, img: require('../resources/images/produits/3760265300112.png') },
  { id: 3760265300129, img: require('../resources/images/produits/3760265300129.png') },
  { id: 3760265300136, img: require('../resources/images/produits/3760265300136.png') },
  { id: 3760265300143, img: require('../resources/images/produits/3760265300143.png') },
  { id: 3760265300150, img: require('../resources/images/produits/3760265300150.png') },
  { id: 3760265300167, img: require('../resources/images/produits/3760265300167.png') },
  { id: 3760265300174, img: require('../resources/images/produits/3760265300174.png') },
  { id: 3760265300181, img: require('../resources/images/produits/3760265300181.png') },
  { id: 3760265300198, img: require('../resources/images/produits/3760265300198.png') },
  { id: 3760265300204, img: require('../resources/images/produits/3760265300204.png') },
  { id: 3760265300211, img: require('../resources/images/produits/3760265300211.png') },
  { id: 3760265300228, img: require('../resources/images/produits/3760265300228.png') },
  { id: 3760265300235, img: require('../resources/images/produits/3760265300235.png') },
  { id: 3760265300242, img: require('../resources/images/produits/3760265300242.png') },
  { id: 3760265300259, img: require('../resources/images/produits/3760265300259.png') },
  { id: 3760265300266, img: require('../resources/images/produits/3760265300266.png') },
  { id: 3760265300273, img: require('../resources/images/produits/3760265300273.png') },
  { id: 3760265300280, img: require('../resources/images/produits/3760265300280.png') },
  { id: 3760265300297, img: require('../resources/images/produits/3760265300297.png') },
  { id: 3760265300303, img: require('../resources/images/produits/3760265300303.png') },
  { id: 3760265300310, img: require('../resources/images/produits/3760265300310.png') },
  { id: 3760265300327, img: require('../resources/images/produits/3760265300327.png') },
  { id: 3760265300334, img: require('../resources/images/produits/3760265300334.png') },
  { id: 3760265300341, img: require('../resources/images/produits/3760265300341.png') },
  { id: 3760265300358, img: require('../resources/images/produits/3760265300358.png') },
  { id: 3760265300365, img: require('../resources/images/produits/3760265300365.png') },
  { id: 3760265300372, img: require('../resources/images/produits/3760265300372.png') },
  { id: 3760265300389, img: require('../resources/images/produits/3760265300389.png') },
  { id: 3760265301607, img: require('../resources/images/produits/3760265301607.png') },
  { id: 3760265301614, img: require('../resources/images/produits/3760265301614.png') },
  { id: 3760265301645, img: require('../resources/images/produits/3760265301645.png') },
  { id: 3760265301652, img: require('../resources/images/produits/3760265301652.png') },
  { id: 3760265301669, img: require('../resources/images/produits/3760265301669.png') },
  { id: 3760265301683, img: require('../resources/images/produits/3760265301683.png') },
  { id: 3760265301706, img: require('../resources/images/produits/3760265301706.png') },
  { id: 3760265302000, img: require('../resources/images/produits/3760265302000.png') },
  { id: 3760265302017, img: require('../resources/images/produits/3760265302017.png') },
  { id: 3760265302024, img: require('../resources/images/produits/3760265302024.png') },
  { id: 3760265302031, img: require('../resources/images/produits/3760265302031.png') },
  { id: 3760265302048, img: require('../resources/images/produits/3760265302048.png') },
  { id: 3760265302055, img: require('../resources/images/produits/3760265302055.png') },
  { id: 3760265302062, img: require('../resources/images/produits/3760265302062.png') },
  { id: 3760265302079, img: require('../resources/images/produits/3760265302079.png') },
  { id: 3760265302086, img: require('../resources/images/produits/3760265302086.png') },
  { id: 3760265302093, img: require('../resources/images/produits/3760265302093.png') },
  { id: 3760265302109, img: require('../resources/images/produits/3760265302109.png') },
  { id: 3760265302208, img: require('../resources/images/produits/3760265302208.png') },
  { id: 3760265302703, img: require('../resources/images/produits/3760265302703.png') },
  { id: 3760265302710, img: require('../resources/images/produits/3760265302710.png') },
  { id: 3760265302727, img: require('../resources/images/produits/3760265302727.png') },
  { id: 3760265301638, img: require('../resources/images/produits/3760265301638.png') },
  { id: 3760265301621, img: require('../resources/images/produits/3760265301621.png') },
  { id: 3760265301690, img: require('../resources/images/produits/3760265301690.png') }
]

const plantesImages = [
  { nom: "achillee-millefeuille", img: require('../resources/images/plantes/achillee-millefeuille.jpg') },
  { nom: "aloes-vera", img: require('../resources/images/plantes/aloes-vera.jpg') },
  { nom: "argousier", img: require('../resources/images/plantes/argousier.jpg') },
  { nom: "armoise-commune", img: require('../resources/images/plantes/armoise-commune.jpg') },
  { nom: "artichaut", img: require('../resources/images/plantes/artichaut.jpg') },
  { nom: "bouleau", img: require('../resources/images/plantes/bouleau.jpg') },
  { nom: "bruyere", img: require('../resources/images/plantes/bruyere.jpg') },
  { nom: "canneberge", img: require('../resources/images/plantes/canneberge.jpg') },
  { nom: "cassis", img: require('../resources/images/plantes/cassis.jpg') },
  { nom: "chardon-marie", img: require('../resources/images/plantes/chardon-marie.jpg') },
  { nom: "desmodium", img: require('../resources/images/plantes/desmodium.jpg') },
  { nom: "echinacee-pourpre", img: require('../resources/images/plantes/echinacee-pourpre.jpg') },
  { nom: "fumeterre", img: require('../resources/images/plantes/fumeterre.jpg') },
  { nom: "ginkgo", img: require('../resources/images/plantes/ginkgo.jpg') },
  { nom: "ginseng", img: require('../resources/images/plantes/ginseng.jpg') },
  { nom: "harpagophyton", img: require('../resources/images/plantes/harpagophyton.jpg') },
  { nom: "lin", img: require('../resources/images/plantes/lin.jpg') },
  { nom: "lotier-cornicule", img: require('../resources/images/plantes/lotier-cornicule.jpg') },
  { nom: "marron-dinde", img: require('../resources/images/plantes/marron-dinde.jpg') },
  { nom: "mauve", img: require('../resources/images/plantes/mauve.jpg') },
  { nom: "melisse", img: require('../resources/images/plantes/melisse.jpg') },
  { nom: "menthe-nanah", img: require('../resources/images/plantes/menthe-nanah.jpg') },
  { nom: "menthe-poivree", img: require('../resources/images/plantes/menthe-poivree.jpg') },
  { nom: "millepertuis", img: require('../resources/images/plantes/millepertuis.jpg') },
  { nom: "myrtille", img: require('../resources/images/plantes/myrtille.jpg') },
  { nom: "olivier", img: require('../resources/images/plantes/olivier.jpg') },
  { nom: "ortie-dioique", img: require('../resources/images/plantes/ortie-dioique.jpg') },
  { nom: "pavot-de-californie", img: require('../resources/images/plantes/pavot-de-californie.jpg') },
  { nom: "pissenlit", img: require('../resources/images/plantes/pissenlit.jpg') },
  { nom: "prele", img: require('../resources/images/plantes/prele.jpg') },
  { nom: "radis-noir", img: require('../resources/images/plantes/radis-noir.jpg') },
  { nom: "reine-des-pres", img: require('../resources/images/plantes/reine-des-pres.jpg') },
  { nom: "romarin", img: require('../resources/images/plantes/romarin.jpg') },
  { nom: "sarriette", img: require('../resources/images/plantes/sarriette.jpg') },
  { nom: "serpolet", img: require('../resources/images/plantes/serpolet.jpg') },
  { nom: "tanaisie", img: require('../resources/images/plantes/tanaisie.jpg') },
  { nom: "tilleul", img: require('../resources/images/plantes/tilleul.jpg') },
  { nom: "valeriane", img: require('../resources/images/plantes/valeriane.jpg') },
  { nom: "vigne-rouge", img: require('../resources/images/plantes/vigne-rouge.jpg') }
]

class ImageStorage {
  async cacheEntireImages() {
    let images = []
    images = images.concat(commonImages)
    images = images.concat(produitsImages)
    images = images.concat(plantesImages)

    await Promise.all(images.map((image) => {
      return Asset.fromModule(image).downloadAsync().catch((ignored) => {
        console.error(ignored) // eslint-disable-line
      })
    }))
  }

  getImages(imageName) {
    const photoItem = commonImages.find((image) => image.name == imageName)
    if (photoItem) {
      return photoItem.uri
    }
    else return require('../resources/images/no-image.png')
  }

  getProduitsImages(idProduit) {
    const produitItem = produitsImages.find((produit) => produit.id == idProduit)
    if (produitItem) {
      return produitItem.img
    }
    else return require('../resources/images/no-image.png')
  }

  getPlantesImages(imageName) {
    const planteItem = plantesImages.find((plante) => plante.nom == imageName)
    if (planteItem) {
      return planteItem.img
    }
    else return require('../resources/images/no-image.png')
  }

  // getPlantesImages(imageName) {
  //   if (!imageName || imageName.trim() == "") {
  //     return require('../resources/images/no-image.png')
  //   }
  //   else if (produitsImages.find((item) => item.plante == imageName)) {
  //     return produitsImages.find((item) => item.plante == imageName).img
  //   }
  //   else return require('../resources/images/no-image.png')
  // }
}

export default new ImageStorage()
