import { Container, Content, Text } from "native-base";
import React, { Component } from "react";
import { StyleSheet, View } from 'react-native';
import TitleHeader from "../../components/titleHeader";

export default class LegalNotice extends Component {

  render() {
    return (
      <Container>
        <TitleHeader title={this.props.titleHeader} navigation={this.props.navigation} iconMenu={'goBack'} />
        <Content padder style={{ backgroundColor: "#FFF" }}>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.line}>{`Version du 10/01/2019 de l’application Flora Natura est édité par : Laboratoires Scientia Natura Société par actions simplifiée au capital de 10 000 euros Dont le siège social est sis 45, route du Stand, 1260 Nyon, Suisse. Immatriculée au registre du commerce de canton de Vaud sous le numéro CH-550.1.058.759-3 Directeur de la publication : Sebastien Bidault N° de téléphone : 0661209497 Email : hello@Flora Natura.com`}</Text>
            <Text style={TextStyle.line}>{`L’accès, l’utilisation, les échanges les consultations, les réservations et tous les achats effectués par l'intermédiaire de l’application Flora Natura de Laboratoires Scientia Natura (ci-après l’ « Application ») emportent reconnaissance et acceptation, sans réserve ni condition, des présentes conditions générales d’utilisation applicables à l’ensemble des services de l’application (ci-après «CGU»). Les présentes CGU ont essentiellement pour objet de définir les conditions et modalités de la mise à la disposition par Laboratoires Scientia Natura d’une Application de services d'information sur les plantes médicinales utilisées en compléments alimentaires, sur les médecines non conventionnelles et l’achat de compléments alimentaires. L’application a aussi pour vocation de messagerie entre professionnels et entre professionnel et utilisateurs. L’application aura aussi pour vocation la consultation a distance, le conseil et la prise de rendez-vous entre professionnel et utilisateur. Ces fonctionnalités sont utilisées par des utilisateur (Utilisateurs) et des professionnels de médecines non conventionnelle ou bien-être (ci-après "Professionnels"). Laboratoires Scientia Natura se réserve le droit de modifier les CGU à tout moment. En cas de modification, la nouvelle version des CGU se substituera à la version précédente, elle sera diffusée et applicable automatiquement aux Utilisateurs. L'accès a l’application est réservé aux personnes physiques capables de souscrire des contrats, au sens du droit français. Est considérée comme Utilisateur de l’application toute personne qui accède à l’application, et/ou l’utilise dans l’une de ses fonctionnalités (ci-après « Utilisateur »).`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 1 : Mise en garde sur les informations diffusées`}</Text>
            <Text style={TextStyle.line}>{`Le rédacteur en chef n'est pas un Professionnel de santé.`}</Text>
            <Text style={TextStyle.line}>{`L’Application a pour objectif de délivrer une information générale, de favoriser les échanges sur les médecines naturelles ou médecines non conventionnelles et de permettre aux Utilisateurs d'acheter des compléments alimentaires.`}</Text>
            <Text style={TextStyle.line}>{`Les informations diffusées sur cette Application ne sont présentées qu'à titre informatif.`}</Text>
            <Text style={TextStyle.line}>{`L’utilisateur et le professionnel ont lu et accepte le code de déontologie de l’application.`}</Text>
            <Text style={TextStyle.line}>{`En particulier, l’Application ne remplace en aucune façon une consultation médicale ou les conseils de tout autre Professionnel de santé. Seul votre médecin généraliste ou spécialiste est habilité à l’établissement d’un diagnostic médical et à l’établissement du traitement adapté qui en découle. De ce fait, l'utilisation des informations fournies s'effectue sous la pleine et entière responsabilité de l'Utilisateur au même titre que l’utilisation qu’il pourrait faire à partir de livres ou revues. En aucun cas, Laboratoires Scientia Natura ne pourra être rendue responsable de cette utilisation.`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura fait en sorte d'assurer au mieux de ses possibilités le fonctionnement et la sécurité de l’Application ainsi que l'exactitude et la mise à jour des informations qui y sont diffusées.`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura se réserve le droit de corriger, lorsqu'elle le jugera opportun, le contenu de cette Application à tout moment.`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura ne peut garantir l'exactitude, la précision, l'exhaustivité des informations mises à la disposition sur l’Application ainsi que la permanence de son bon fonctionnement et de sa totale sécurité informatique. Laboratoires Scientia Natura décline donc toute responsabilité pour les imprécisions ou omissions portant sur des informations disponibles sur l’Application.`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura met tout en œuvre pour offrir aux Utilisateurs des informations et/ou des outils disponibles et vérifiés, mais ne saurait être tenu pour responsable des erreurs, d'une absence de disponibilité des informations et/ou de la présence de virus sur l’Application. En conséquence, l'Utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.`}</Text>
            <Text style={TextStyle.line}>{`Les informations contenues dans ce Application ne lient pas contractuellement Laboratoires Scientia Natura.`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 2 : Description des services`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura offre gratuitement aux Utilisateurs l’accès et l'utilisation de l’Application Flora Natura afin de profiter des services suivants (ci-après dénommés les « Services ») :`}</Text>
            <Text style={TextStyle.Heading2}>{`2.1 la vente de complément alimentaires`}</Text>
            <Text style={TextStyle.line}>{`L’Application permet à l'Utilisateur d’acheter des compléments alimentaires. Les compléments alimentaires mis en vente sur l’Application respectent les directives de l’Union Européenne. La vente se fait prix départ France. Laboratoires propose un service d’envoi. Il appartient à chaque utilisateur de la responsabilité de faire les démarches d’importation si nécessaire. Laboratoires Scientia Natura ne peut pas être tenu responsable du refus de l’entrée sur le territoire par l’autorité du pays de l’utilisateur.`}</Text>
            <Text style={TextStyle.line}>{`L’application Flora Natura propose l’aide d’un Professionnel lors d’un achat de complément alimentaire. L’Utilisateur accepte donc d’être contacté par Flora Natura ou par le Professionnel concerné afin de répondre a ces questions. A cet effet, l’Utilisateur est informé et accepte que ses données à caractère personnel soient communiquées au Professionnel concerné.`}</Text>
            <Text style={TextStyle.Heading2}>{`2.2 Services d'information sur les plantes médicinales utilisées en compléments alimentaires`}</Text>
            <Text style={TextStyle.line}>{`Le contenu est fourni à titre purement indicatif, dans les limites indiquées à l'article 1 et 4.1 des présentes.`}</Text>
            <Text style={TextStyle.Heading2}>{`2.3 consultations de médecines non conventionnelles`}</Text>
            <Text style={TextStyle.line}>{`L’Application permet à l'Utilisateur de se mettre en relation avec des professionnels de médecine conventionnelles ou bien-être. L’utilisateur pourra rechercher et acheter des Consultations ou ateliers de médecines non conventionnelles ou bien-être auprès des Professionnels inscrits sur Flora Natura  (ci-après les « Consultations »).`}</Text>
            <Text style={TextStyle.line}>{`Lorsque l’Utilisateur procède à la réservation d’une Consultation sur l’Application, la prise de rendez-vous est faite par l'intermédiaire de Flora Natura. L’Utilisateur accepte donc d’être contacté par Flora Natura ou par le Professionnel concerné afin de fixer le rendez-vous. A cet effet, l’Utilisateur est informé et accepte que ses données à caractère personnel soient communiquées au Professionnel concerné.`}</Text>
            <Text style={TextStyle.line}>{`La disponibilité d’une Consultation est précisée au moment de la demande de rendez-vous effectuée par l’Utilisateur. Cette information est donnée à titre indicatif. Flora Natura ne garantit en aucune manière celle-ci, le Professionnel concerné pouvant seul confirmer sa disponibilité à une date précise.`}</Text>
            <Text style={TextStyle.line}>{`Flora Natura n’agissant qu’en qualité de simple intermédiaire entre l’Utilisateur et les Professionnels, tout différend pouvant s’élever entre l’Utilisateur et le Professionnel doit être traité directement entre eux.`}</Text>
            <Text style={TextStyle.Heading2}>{`2.4. Possibilité de donner un retour sur des conseils de Professionnels`}</Text>
            <Text style={TextStyle.line}>{`L'Utilisateur, qui demande conseil auprès d’un Professionnel par le biais de l’Application, a la possibilité de donner un retour sur le conseil, seulement après avoir bénéficié effectivement du conseil.`}</Text>
            <Text style={TextStyle.line}>{`Ce Service est au cœur de l'offre de Laboratoires Scientia Natura et permet à la communauté des Utilisateurs de bénéficier d'un retour d'expérience, pour valider la qualité des conseils proposées par les Professionnels inscrits sur l’Application.`}</Text>
            <Text style={TextStyle.Heading2}>{`2.5 Possibilité d’échanger en directe avec la messagerie.`}</Text>
            <Text style={TextStyle.line}>{`Flora Natura permet d’échanger des messages instantanés privés électroniques entre Professionnels et entre Professionnel et Utilisateurs.`}</Text>
            <Text style={TextStyle.line}>{`Les utilisatrices et les utilisateurs de Flora Natura se garderont de divulguer leurs codes d'accès. Chaque Utilisateur et Professionnel peut modifier son mot de passe à tout moment. Les Utilisateurs et Professionnels sont responsables des propos, discussion et échanges de documents qu'ils publient et doivent donc veiller à ce que les droits de tiers ne soient pas violés (par exemple droits immatériels, droits d'auteur ou droits liés à la protection de la personnalité). Laboratoires Scientia Natura décline toute responsabilité quant aux contenus et à la licéité des fichiers qui sont envoyés, reçus ou publiés sous quelque forme que ce soit par les Utilisateur et Professionnel de Flora Natura; ceci s'applique aux textes, mais également aux images, aux sons, à tous les liens et à toutes les adresses électroniques.`}</Text>
            <Text style={TextStyle.line}>{`Les membres de Flora Natura s'engagent à ne pas diffuser ou conserver sur la plate-forme des informations contraires au droit ou à la morale. Cette restriction concerne également d'éventuels liens pointant sur des sites Web dont le contenu serait illicite.`}</Text>
            <Text style={TextStyle.line}>{`Les informations contenues dans ce Application ne lient pas contractuellement Laboratoires Scientia Natura.`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 3 : Utilisation des services de Flora Natura`}</Text>
            <Text style={TextStyle.Heading2}>{`3.1. Création d’un compte client par l’Utilisateur`}</Text>
            <Text style={TextStyle.line}>{`Tout Utilisateur peut naviguer sur l’Application sans qu’aucune obligation n’en découle.`}</Text>
            <Text style={TextStyle.line}>{`En revanche, lorsqu’un Utilisateur souhaite bénéficier des Services proposés sur l’Application, celui-ci doit fournir informations obligatoires suivantes, précises et exactes, et qui sont nécessaires au parfait traitement de sa commande :`}</Text>
            <Text style={TextStyle.line}>{`- adhésion à la charte utilisateur de Flora Natura*`}</Text>
            <Text style={TextStyle.line}>{`- nom* : - prénom* : - date de naissance* -numéro de téléphone portable*`}</Text>
            <Text style={TextStyle.line}>{`- questionnaire de santé*`}</Text>
            <Text style={TextStyle.Heading2}>{`3.2. Création d’un compte client par le Professionnel`}</Text>
            <Text style={TextStyle.Heading2}>{`Tout nouveau professionnel doit être coopté par un professionnel existant et enregistrée sur Flora Natura. Le cooptage peut se faire via Linkedin ou rencontre physique.`}</Text>
            <Text style={TextStyle.line}>{`Tout Professionnel peut naviguer sur l’Application sans qu’aucune obligation n’en découle.`}</Text>
            <Text style={TextStyle.line}>{`En revanche, lorsqu’un Professionnel souhaite bénéficier des Services proposés sur l’Application, celui-ci doit fournir informations obligatoires suivantes, précises et exactes, et qui sont nécessaires au parfait traitement de sa commande :`}</Text>
            <Text style={TextStyle.line}>{`- adhésion à la charte Professionnel de Flora Natura\n- nom : - prénom : - date de naissance -numéro de téléphone (si possible mobile) \n- nom de l’ecole de formation \n-Copie de du diplôme obtenu et date d’obtention \n- Année d’expérience`}</Text>
            <Text style={TextStyle.Heading2}>{`3.2. Paiement de la Consultation`}</Text>
            <Text style={TextStyle.line}>{`Toute Consultation réservée par l’Utilisateur auprès de Flora Natura sera réglée sur l’application. Un retributionprès du Professionnel lors de la Consultation.`}</Text>
            <Text style={TextStyle.line}>{`Toute demande de facture doit être adressée directement au Professionnel délivrant la Consultation, seul compétent et habilité à l’établir.`}</Text>
            <Text style={TextStyle.Heading2}>{`3.3. Paiement en cas de retard, report et annulation de rendez-vous`}</Text>
            <Text style={TextStyle.line}>{`En cas de retard ou de non présentation lors du rendez-vous avec le Professionnel, la Consultation sera due par l’Utilisateur directement auprès du Professionnel.`}</Text>
            <Text style={TextStyle.line}>{`En cas de souhait de reporter ou annuler un rendez-vous pris, l’Utilisateur devra contacter Scientia Natura au moins 48 (quarante-huit) heures ouvrées avant l’heure prévue de la Consultation. L’acceptation de ce report ou annulation reste à la discrétion du Professionnel, ce que l’Utilisateur comprend et accepte. Dans le cas contraire, la consultation serait due par l'Utilisateur et à régler au Professionnel dans les meilleurs délais.`}</Text>
            <Text style={TextStyle.Heading2}>{`3.3. Vérification`}</Text>
            <Text style={TextStyle.line}>{`Flora Natura peut, à des fins de transparence, d’amélioration de la confiance, ou de prévention ou détection des fraudes, mettre en place un système de vérification de certaines des informations que vous fournissez sur votre profil. C’est notamment le cas lorsque vous renseignez votre numéro de téléphone ou nous fournissez une pièce d’identité.`}</Text>
            <Text style={TextStyle.line}>{`Vous reconnaissez et acceptez que toute référence sur la Application ou les Services à des informations dites « vérifiées » ou tout terme similaire, signifie uniquement qu’un Membre a réussi avec succès la procédure de vérification existante sur la Application ou les Services afin de vous fournir davantage d’informations sur le Membre avec lequel vous envisagez de voyager. Flora Natura ne garantit ni la véracité, ni la fiabilité, ni la validité de l’information ayant fait l’objet de la procédure de vérification.`}</Text>
            <Text style={TextStyle.Heading3}>{`5.2. Frais de Service`}</Text>
            <Text style={TextStyle.line}>{`Dans le cadre des Trajets, Flora Natura prélève, en contrepartie de l’utilisation de la Application, au moment de la Réservation, des frais de service (ci-après, les « Frais de Service ») calculés sur la base du montant de la Participation aux Frais ou du Prix, le cas échéant. Les modalités de calcul des Frais de Service en vigueur sont accessibles ici.`}</Text>
            <Text style={TextStyle.line}>{`Les Frais de Service sont perçus par Flora Natura pour chaque Place faisant l’objet d’une Réservation par un Passager.`}</Text>
            <Text style={TextStyle.line}>{`En ce qui concerne les trajets transfrontaliers, veuillez noter que les modalités de calcul du montant des Frais de Services et de la TVA applicable varient selon la résidence du Passager.`}</Text>
            <Text style={TextStyle.line}>{`Lorsque vous utilisez la Application pour des Trajets transfrontaliers ou hors de France, les Frais de Services peuvent être facturés par une société affiliée de Flora Natura éditant la Application locale.`}</Text>
            <Text style={TextStyle.Heading3}>{`5.3. Arrondis`}</Text>
            <Text style={TextStyle.line}>{`Vous reconnaissez et acceptez que Flora Natura peut, à son entière discrétion, arrondir au chiffre inférieur ou supérieur les Frais de Service et la Participation aux Frais.`}</Text>
            <Text style={TextStyle.Heading3}>{`5.4. Modalités de paiement et de reversement de la Participation aux Frais au Conducteur ou du Prix au Autocaristes`}</Text>
            <Text style={TextStyle.Heading2}>{`5.4.1. Mandat d’encaissement`}</Text>
            <Text style={TextStyle.line}>{`En utilisant la Application en tant que Conducteur pour des Trajets avec Réservation, vous confiez à Flora Natura un mandat d’encaissement du montant de la Participation aux Frais en votre nom et pour votre compte.`}</Text>
            <Text style={TextStyle.line}>{`Par conséquent, dans le cadre d’un Trajet en Covoiturage, et après acceptation manuelle ou automatique de la Réservation, Flora Natura encaisse la totalité de la somme versée par le Passager (Frais de Service et Participation aux Frais).`}</Text>
            <Text style={TextStyle.line}>{`Les Participations aux Frais reçues par Flora Natura sont déposées sur un compte dédié au paiement des Conducteurs.`}</Text>
            <Text style={TextStyle.line}>{`Vous reconnaissez et acceptez qu’aucune des sommes perçues par Flora Natura au nom et pour le compte du Conducteur n’emporte droit à intérêts. Vous acceptez de répondre avec diligences à toute demande de Flora Natura et plus généralement de toute autorité administrative ou judiciaire compétente en particulier en matière de prévention ou la lutte contre le blanchiment. Notamment, vous acceptez de fournir, sur simple demande, tout justificatif d’adresse et/ou d’identité utile.`}</Text>
            <Text style={TextStyle.line}>{`En l’absence de réponse de votre part à ces demandes, Flora Natura pourra prendre toute mesure qui lui semblera appropriée notamment le gel des sommes versées et/ou la suspension de votre Compte et/ou la résiliation des présentes CGU.`}</Text>
            <Text style={TextStyle.Heading2}>{`5.4.2. Versement de la Participation aux Frais au Conducteur`}</Text>
            <Text style={TextStyle.line}>{`A la suite du Trajet en Covoiturage, les Passagers disposent d’un délai de 24 heures pour présenter une réclamation à Flora Natura . En l’absence de contestation de leur part dans cette période, Flora Natura considère la confirmation du Trajet comme acquise.`}</Text>
            <Text style={TextStyle.line}>{`A compter de cette confirmation expresse ou tacite, vous disposez, en tant que Conducteur, d’un crédit exigible sur votre Compte. Ce crédit correspond au montant total payé par le Passager au moment de la confirmation de la Réservation diminué des Frais de Service, c’est-à-dire au montant de la Participation aux Frais payée par le Passager.`}</Text>
            <Text style={TextStyle.line}>{`Lorsque le Trajet en Covoiturage est confirmé par le Passager, vous avez la possibilité, en tant que Conducteur, de donner instructions à Flora Natura de vous verser l’argent sur votre compte bancaire (en renseignant sur votre Compte, au préalable, vos coordonnées bancaires) ou votre compte Paypal (en renseignant sur votre Compte, au préalable, votre adresse email Paypal).`}</Text>
            <Text style={TextStyle.line}>{`L’ordre de virement à votre nom sera transmis le premier jour ouvré suivant votre demande ou à défaut de demande de votre part, le premier jour ouvré suivant la mise à disposition sur votre profil des sommes concernées (sous réserve que Flora Natura dispose de vos informations bancaires).`}</Text>
            <Text style={TextStyle.line}>{`A l’issue du délai de prescription de 5 ans applicable, toute somme non réclamée à Flora Natura sera réputée appartenir à Flora Natura.`}</Text>
            <Text style={TextStyle.Heading2}>{`5.4.3. Versement du Prix à l’Autocariste`}</Text>
            <Text style={TextStyle.line}>{`A la suite du Trajet en Bus, vous disposez d’un délai de 24 heures pour présenter une réclamation à Flora Natura. En l’absence de contestation de votre part, Flora Natura considère la confirmation du Trajet en Bus comme acquise et versera le Prix à l’Autocariste.`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 4 : Limitation de responsabilité`}</Text>
            <Text style={TextStyle.Heading2}>{`Article 4.1 : Réservation de Consultation sur le Application`}</Text>
            <Text style={TextStyle.line}>{`Scientia Natura permet l’hébergement et la diffusion de propositions de Consultations sur le Application qu’elle édite et n'intervient qu'en cette qualité entre l'Utilisateur et le Professionnel.`}</Text>
            <Text style={TextStyle.line}>{`Scientia Natura n'agit aucunement en tant que loueur ou mandataire au sens de la Loi n° 70-9 du 2 janvier 1970 dite « Loi Hoguet » et du Décret n° 72-678 du 20 juillet 1972. Scientia Natura souhaite uniquement permettre à tous les Utilisateurs d'être mis en relation avec des Professionnels qui ont publié des offres de consultation sur le Application. L'Utilisateur est parfaitement informé du simple rôle d’intermédiaire de Scientia Natura.`}</Text>
            <Text style={TextStyle.line}>{`Scientia Natura n’intervient qu’en qualité d’intermédiaire technique répondant aux prescriptions de l’article 6-1-2 de la Loi pour la Confiance en l’Economie Numérique du 21 juin 2004, dite « LCEN ».`}</Text>
            <Text style={TextStyle.line}>{`Les Professionnels peuvent s'inscrire sur le Application sur la base de recommandations déclarées par la communauté des Utilisateurs ou par des Professionnels déjà inscrits. La responsabilité de Scientia Natura est limitée à la mise à disposition de ces références.`}</Text>
            <Text style={TextStyle.line}>{`Scientia Natura fait ses meilleurs efforts pour que les informations présentées sur le Application relativement aux Consultations et aux Professionnels soient détaillées, complètes, vérifiées ou exactes. Cependant Scientia Natura n’est pas en mesure de vérifier l'entière véracité ou l'exactitude du contenu des offres de Consultation publiées sur le Application par les Professionnels, ni en mesure de contrôler la capacité des Professionnels à fournir les consultation aux Utilisateurs.`}</Text>
            <Text style={TextStyle.line}>{`En conséquence l'Utilisateur est informé du fait que`}</Text>
            <Text style={TextStyle.line}>{`- Les documents, informations, fiches descriptives, et, en général, tout contenu présent sur le Application sont fournis sans aucune garantie de résultat et sont placées sous la responsabilité du Professionnel.`}</Text>
            <Text style={TextStyle.line}>{`- Le Professionnel est seul responsable des Consultations qu'il propose, de leur qualité, leur sûreté et de leur respect des lois et règlements en vigueur`}</Text>
            <Text style={TextStyle.line}>{`- Le Professionnel est seul responsable de l'obligation d'informer les Utilisateurs de toute information nécessaire au bon déroulement de la Consultation.`}</Text>
            <Text style={TextStyle.line}>{`- Scientia Natura ne garantit aucunement et de quelque façon que ce soit les produits, services et/ou pratiques commerciales des Professionnels présents sur son Application. Scientia Natura ne garantit pas à l'Utilisateur la pleine et entière satisfaction relative à une Consultation réservée auprès de l’un des Professionnels par le biais du Application.`}</Text>
            <Text style={TextStyle.line}>{`- La responsabilité de Scientia Natura vis-à-vis des Utilisateurs ne peut être engagée en cas de litige avec un Professionnel.`}</Text>
            <Text style={TextStyle.line}>{`L'Utilisateur reconnaît expressément que les photos et vidéos présentes sur le Application ne sont pas contractuelles.`}</Text>
            <Text style={TextStyle.line}>{`Si toutefois l'Utilisateur note qu'une information fournie par le Professionnel sur le Application était incorrecte, ou que le Professionnel ne respecte pas le code de déontologie du Application, il est encouragé à le faire savoir au plus vite par email à hello@Flora Natura.com`}</Text>
            <Text style={TextStyle.Heading2}>{`Article 4.2 : Massage`}</Text>
            <Text style={TextStyle.line}>{`Des massages sont proposés sur le Application`}</Text>
            <Text style={TextStyle.line}>{`L’Utilisateur reconnaît et accepte que le terme « massage » ne corresponde aucunement à la définition légale donnée par les dispositions règlementaires de l’article R. 4321-3 du Code de la Santé Publique français (Décret n° 2004-802 du 29 juillet 2004 - JO du 8 août 2004). Il est rappelé que les massages médicaux, sportifs ou thérapeutiques ne peuvent être réalisés que par des médecins ou masseurs kinésithérapeutes. Le terme «massage » désigne sur le Application de manière générique et globale toute manœuvre, tout soin, traitement ou modelage uniquement relaxant et/ou esthétique, excluant tout caractère ou toute vertu d’ordre médical ou thérapeutique ou sportive. Sauf précision expresse du Professionnel vérifiée par l’Utilisateur lui-même, aucun des massages n’est réalisé par un médecin ou un masseur kinésithérapeute.`}</Text>
            <Text style={TextStyle.Heading2}>{`Article 4.3 : Profil des Utilisateurs`}</Text>
            <Text style={TextStyle.line}>{`Pour les personnes mineures, les parents sont tenus de vérifier si la Consultation est appropriée pour eux.`}</Text>
            <Text style={TextStyle.line}>{`En cas de grossesse et quel que soit la Consultation, il est recommandé à l’Utilisateur de demander l’avis préalable de son médecin, de même que celui du Professionnel qu'elle souhaite consulter. Il en est de même pour les personnes fragiles, comme par exemple sans que cette liste ne soit considérée comme limitative, les personnes âgées, les personnes ayant des problèmes cardiaques ou de tension, les personnes sujettes à des allergies, etc.`}</Text>
            <Text style={TextStyle.Heading2}>{`Article 4.4 : Fonctionnement du réseau Internet`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura fera ses meilleurs efforts pour assurer la continuité du service.`}</Text>
            <Text style={TextStyle.line}>{`Cependant compte tenu des spécificités du réseau Internet, sur lequel Laboratoires Scientia Natura n’a aucun contrôle ni maîtrise,`}</Text>
            <Text style={TextStyle.line}>{`- La responsabilité de Laboratoires Scientia Natura ne peut pas être engagée en cas de dommages liés à l'impossibilité temporaire d'accéder à l'un des Services de l’Application.`}</Text>
            <Text style={TextStyle.line}>{`- L'Utilisateur reconnaît notamment qu'il est impossible de garantir que les données que l'Utilisateur aura transmises seront entièrement sécurisées. Ainsi, la responsabilité de Laboratoires Scientia Natura ne pourra être engagée en cas d’incident portant atteinte à la sécurité et protection des données. Laboratoires Scientia Natura assure néanmoins user de tous les moyens mis à sa disposition pour garantir un maximum de sécurité.`}</Text>
            <Text style={TextStyle.line}>{`- L'Utilisateur reconnaît que, d'une manière générale et en l'état de la technique actuelle, chaque fois qu'il fournit des informations personnelles en ligne, ces informations peuvent être collectées et utilisées par des tiers. Par conséquent, l'Utilisateur décharge Laboratoires Scientia Natura de toute responsabilité ou conséquence dommageable de l'utilisation par des tiers des informations échangées par le biais des outils de communication (notamment les avis) proposés par l’Application.`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura ne saurait être tenue pour responsable de pour toute détérioration ou dysfonctionnement causé par l'intrusion d'un virus dans les systèmes des Utilisateurs lors d'un téléchargement de données en provenance du Application, pour tous dommages, préjudices directs ou indirects quelles que soient les causes, origines, natures ou conséquences, provoqués à raison de l'accès de quiconque au Application ou de l'impossibilité d'y accéder, de même que l'utilisation du Application et/ou du crédit accordé à une quelconque information provenant directement ou indirectement de ce dernier.`}</Text>
            <Text style={TextStyle.Heading2}>{`Article 4.5 : Liens hypertextes`}</Text>
            <Text style={TextStyle.line}>{`Les liens hypertexte mis en place dans le cadre de la présente Application à travers la Messagerie Chat ou discussion, en direction d'autres Applications présents sur les réseaux Internet ne sauraient engager la responsabilité de la société Laboratoires Scientia Natura.`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 5 : Obligations de l'Utilisateur`}</Text>
            <Text style={TextStyle.line}>{`Il appartient à l'Utilisateur de faire toutes vérifications qui semblent nécessaires ou opportunes avant de procéder à une commande de compléments alimentaires ou d’une Consultation auprès des Professionnels présents sur l’Application.`}</Text>
            <Text style={TextStyle.Heading2}>{`5.1 Communication d’informations exactes, complètes et mises à jour`}</Text>
            <Text style={TextStyle.line}>{`L’Utilisateur s’engage à fournir des informations exactes et complètes et de les maintenir à jour, tout particulièrement les données nécessaires à pour le contacter au sujet d'une Consultation à venir réservée sur l’Application.`}</Text>
            <Text style={TextStyle.Heading2}>{`5.2. Respect des droits de propriété`}</Text>
            <Text style={TextStyle.line}>{`Tous droits de reproduction et de représentation réservés.`}</Text>
            <Text style={TextStyle.line}>{`Ainsi, les marques de la société Laboratoires Scientia Natura figurant sur l’Application sont des marques déposées. Toute reproduction, totale ou partielle de ces marques sans autorisation expresse de la société Laboratoires Scientia Natura est donc également interdite.`}</Text>
            <Text style={TextStyle.line}>{`Les éléments (logos, vidéos, photos,...) Contenus dans l’Application sont la propriété de Laboratoires Scientia Natura ou de ses clients ou de ses fournisseurs ainsi que de leurs auteurs.`}</Text>
            <Text style={TextStyle.line}>{`Ainsi, toute représentation totale ou partielle d’Application ou d'un ou plusieurs de ses composants par quelque procédé que ce soit, sans autorisation expresse de la société Laboratoires Scientia Natura est interdite et constitue une contrefaçon sanctionnée par les dispositions du code de la propriété intellectuelle.`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura autorise les Utilisateurs`}</Text>
            <Text style={TextStyle.bullet}>{`■  A consulter la présente Application pour leur usage personnel`}</Text>
            <Text style={TextStyle.bullet}>{`■  A effectuer l'impression de documents ou de toute autre information diffusée sur l’Application,`}</Text>
            <Text style={TextStyle.bullet}>{`■  A télécharger tout ou partie des informations figurant sur l’Application.`}</Text>
            <Text style={TextStyle.bullet}>{`■  A utiliser de liens hypertextes et/ou d’hyperliens pointant vers l’Application dans le strict cadre de la promotion du Application et des projets mais à la condition déterminante que l’intégrité du Application soit préservée et qu’aucun risque de confusion entre l’Application et les Applications édités par des tiers ne soit constaté.`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires Scientia Natura conserve tous les droits non expressément autorisés.`}</Text>
            <Text style={TextStyle.line}>{`Ainsi, les Utilisateurs ne sont pas autorisés :`}</Text>
            <Text style={TextStyle.bullet}>{`■  A modifier, désassembler ou arranger les logiciels utilisés dans l’Application, à enlever ou tenter d'enlever les mentions copyright et noms des personnes mentionnées sur l’Application,`}</Text>
            <Text style={TextStyle.bullet}>{`■  A créer un lien à partir d'une page ou d'un élément quelconque d'Internet ou de tout autre réseau vers toute image ou notice y afférent.`}</Text>
            <Text style={TextStyle.bullet}>{`■  A avoir recours aux techniques dit de « framing », « d’inline linking » et de « deep-linking » portant sur la reproduction servile non autorisée du contenu de l’Application et son intégration sur des pages web éditées par des tiers.`}</Text>
            <Text style={TextStyle.bullet}>{`■  A reproduire et/ou représenter tout élément composant l’Application et notamment les textes, images, photographies, illustrations et documents sur quelque support que ce soit ;`}</Text>
            <Text style={TextStyle.bullet}>{`■  A adapter, arranger, modifier, corriger, associer, traduire en toutes langues ou tous langages, mettre sur le marché à titre gratuit ou onéreux, commercialiser, tout ou partie d’Application ou de l’un quelconque des éléments qui le composent, quels qu’en soient le moyen et le support.`}</Text>
            <Text style={TextStyle.line}>{`De même, les Utilisateurs doivent s'abstenir, s'agissant des informations à caractère personnel auxquelles ils auraient pu accéder, de toute collecte, captation, déformation ou utilisation et d'une manière générale, de tout acte susceptible de porter atteinte à la vie privée ou à la réputation des personnes.`}</Text>
            <Text style={TextStyle.Heading2}>{`5.3. Obligations relatives aux contenus publiés`}</Text>
            <Text style={TextStyle.line}>{`Dans le cadre des Services, l’Utilisateur peut être amené à faire un retour et à commenter les Consultations commandées sur l’Application et dont il aurait pu bénéficier.`}</Text>
            <Text style={TextStyle.line}>{`L'Utilisateur est invité à écrire son témoignage de façon à ce que son retour soit intéressant pour les autres Utilisateurs d’Application et constructif pour le Professionnel. Le témoignage doit être basé uniquement sur le travail effectué, les résultats obtenus et le relationnel avec le Professionnel.`}</Text>
            <Text style={TextStyle.line}>{`Dans l'hypothèse où l'Utilisateur ne serait pas satisfait de la Consultation, son témoignage sera l'occasion de le faire savoir, tout en prenant en compte le fait qu'aucun professionnel de la médecine douce ne peut garantir un résultat de son traitement ou de ses méthodes, et qu'il convient donc de faire preuve de prudence dans les reproches qui pourraient être formulés.`}</Text>
            <Text style={TextStyle.line}>{`L'Utilisateur s'engage à ne pas :`}</Text>
            <Text style={TextStyle.bullet}>{`■  Utiliser les Services proposés pour tout objet contrevenant aux lois françaises, aux dispositions législatives et réglementaires de tous pays et aux conventions internationales, à l'ordre public et aux bonnes mœurs ;`}</Text>
            <Text style={TextStyle.bullet}>{`■  Usurper l'identité d'une autre personne, Utilisateur ou non ;`}</Text>
            <Text style={TextStyle.bullet}>{`■  Mettre en ligne, enregistrer ou transmettre des éléments pouvant porter atteinte aux droits des tiers, et notamment :`}</Text>
            <Text style={TextStyle.bullet2}>{`•  Des éléments protégés par des droits d'auteur, sauf s'il garantit avoir obtenu la permission du titulaire des droits et qu'il peut en apporter la preuve ;`}</Text>
            <Text style={TextStyle.bullet2}>{`•  Des éléments présentant le caractère de la concurrence déloyale ;`}</Text>
            <Text style={TextStyle.bullet2}>{`•  Des éléments obscènes, violents, diffamants, injurieux, menaçants, malveillants, abusifs à l'égard de toute personne physique ou morale, Utilisateur du service ou non ;`}</Text>
            <Text style={TextStyle.bullet2}>{`•  Des éléments incitant à la discrimination, à la haine d'une personne ou d'un groupe de personnes à raison notamment de leurs opinions politiques, de leur origine ou de leur appartenance ou de leur non-appartenance vraie ou supposée à une ethnie, une nation, une race ou une religion déterminée ou de leur orientation sexuelle ;`}</Text>
            <Text style={TextStyle.bullet2}>{`•  Des éléments pouvant porter atteinte à la présomption d'innocence des personnes ou au respect et à l'autorité dus à la Justice ;`}</Text>
            <Text style={TextStyle.bullet2}>{`•  Des éléments à caractère pornographique et/ou ayant trait à la pédopornographie ou nuisibles à la protection des mineurs ;`}</Text>
            <Text style={TextStyle.bullet2}>{`•  Des éléments pouvant porter atteinte à la sécurité ou à l'intégrité d'un Etat ou d'un territoire, pouvant inciter à commettre un délit, un crime ou un acte de terrorisme ou faisant l'apologie des crimes de guerre ou des crimes contre l'humanité ou incitant au suicide ;`}</Text>
            <Text style={TextStyle.bullet2}>{`•  Des publicités ou des sollicitations commerciales et/ou des petites annonces de toute nature.`}</Text>
            <Text style={TextStyle.bullet}>{`■  Publier de contenu susceptible de perturber ou d’endommager de quelque manière que ce soit le système informatique de Scientia Natura.`}</Text>
            <Text style={TextStyle.line}>{`Tous les Contenus, qu'il s'agisse des contenus publiés ou communiqués à titre public ou privé, sont placés sous la seule responsabilité de l’Utilisateur qui les publie et les utilise à ses entiers risques et périls.`}</Text>
            <Text style={TextStyle.Heading2}>{`5.4. Utilisation des contenus publiés`}</Text>
            <Text style={TextStyle.line}>{`L'Utilisateur accepte que les contenus ainsi publiés deviennent des informations publiques.`}</Text>
            <Text style={TextStyle.line}>{`L'Utilisateur accepte que les contenus soient publiés, reproduits, modifiés, traduits, distribués, présentés et/ou affichés, sous quelque forme, support ou technologie que ce soit, actuellement connus ou inconnus.`}</Text>
            <Text style={TextStyle.line}>{`L'Utilisateur concède aux autres Utilisateurs, le droit d'accéder, afficher, enregistrer et reproduire les communications pour leur usage personnel, sans que la responsabilité de Scientia Natura ne puisse être engagée à cet égard.`}</Text>
            <Text style={TextStyle.Heading3}>{`11. Propriété intellectuelle`}</Text>
            <Text style={TextStyle.Heading2}>{`11.1. Contenu publié par Flora Natura`}</Text>
            <Text style={TextStyle.line}>{`Sous réserve des contenus fournis par ses Membres, Flora Natura est seule titulaire de l’ensemble des droits de propriété intellectuelle afférents au Service, à la Application, à son contenu (notamment les textes, images, dessins, logos, vidéos, sons, données, graphiques) ainsi qu’aux logiciels et bases de données assurant leur fonctionnement.`}</Text>
            <Text style={TextStyle.line}>{`Flora Natura vous accorde une licence non exclusive, personnelle et non cessible d’utilisation de la Application et des Services, pour votre usage personnel et privé, à titre non commercial et conformément aux finalités de la Application et des Services.`}</Text>
            <Text style={TextStyle.line}>{`Vous vous interdisez toute autre utilisation ou exploitation de la Application et des Services, et de leur contenu sans l’autorisation préalable écrite de Flora Natura. Notamment, vous vous interdisez de :`}</Text>
            <Text style={TextStyle.bullet}>{`■  (i) reproduire, modifier, adapter, distribuer, représenter publiquement, diffuser la Application, les Services et leur contenu, à l’exception de ce qui est expressément autorisé par Flora Natura ;`}</Text>
            <Text style={TextStyle.bullet}>{`■  (ii) décompiler, procéder à de l’ingénierie inverse de la Application ou des Services, sous réserve des exceptions prévues par les textes en vigueur ;`}</Text>
            <Text style={TextStyle.bullet}>{`■  (iii) extraire ou tenter d’extraire (notamment en utilisant des robots d’aspiration de données ou tout autre outil similaire de collecte de données) une partie substantielle des données de la Application.`}</Text>
            <Text style={TextStyle.Heading2}>{`11.2. Contenu publié par vous sur la Application`}</Text>
            <Text style={TextStyle.line}>{`Afin de permettre la fourniture des Services et conformément à la finalité de l’Application, vous concédez à Flora Natura une licence non exclusive d’utilisation des contenus et données que vous fournissez dans le cadre de votre utilisation des Services (ci-après, votre « Contenu Membre »). Afin de permettre à Flora Natura la diffusion par réseau numérique et selon tout protocole de communication, (notamment Internet et réseau mobile), ainsi que la mise à disposition au public du contenu de l’Application, vous autorisez Flora Natura, pour le monde entier et pour toute la durée de votre relation contractuelle avec Flora Natura, à reproduire, représenter, adapter et traduire votre Contenu Membre de la façon suivante :`}</Text>
            <Text style={TextStyle.bullet}>{`■  (i) vous autorisez Flora Natura à reproduire tout ou partie de votre Contenu Membre sur tout support d’enregistrement numérique, connu ou inconnu à ce jour, et notamment sur tout serveur, disque dur, carte mémoire, ou tout autre support équivalent, en tout format et par tout procédé connu et inconnu à ce jour, dans la mesure nécessaire à toute opération de stockage, sauvegarde, transmission ou téléchargement lié au fonctionnement de la Application et à la fourniture du Service ;`}</Text>
            <Text style={TextStyle.bullet}>{`■  (ii) vous autorisez Flora Natura à adapter et traduire votre Contenu Membre, ainsi qu’à reproduire ces adaptations sur tout support numérique, actuel ou futur, stipulé au (i) ci-dessus, dans le but de fournir les Services, notamment en différentes langues. Ce droit comprend notamment la faculté de réaliser, dans le respect de votre droit moral, des modifications de la mise en forme de votre Contenu Membre aux fins de respecter la charte graphique de l’Application et/ou de le rendre techniquement compatible en vue de sa publication via la Application.`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 6 : Durée - Résiliation`}</Text>
            <Text style={TextStyle.Heading2}>{`6.1. Durée`}</Text>
            <Text style={TextStyle.line}>{`L’Utilisateur est autorisé à accéder à l’Application et utiliser ses Services pour une durée indéterminée.`}</Text>
            <Text style={TextStyle.Heading2}>{`6.2. Résiliation à l’initiative de Laboratoires Scientia Natura`}</Text>
            <Text style={TextStyle.line}>{`En cas de manquement par l’Utilisateur à l’une des dispositions des présentes CGU, Laboratoires Scientia Natura peut résilier les CGU, de plein droit, à tout moment, sans préavis ni indemnité, par tous moyens de communication, sans qu'il soit nécessaire d'effectuer aucune autre formalité judiciaire ou extrajudiciaire.`}</Text>
            <Text style={TextStyle.Heading2}>{`6.3. Résiliation à l’initiative de l’Utilisateur`}</Text>
            <Text style={TextStyle.line}>{`La demande par l’Utilisateur de supprimer ses informations personnelles conformément à l'article CNIL vaut résiliation. Les présentes CGU demeureront néanmoins applicables jusqu’à la parfaite clôture des relations contractuelles engagées entre les Parties. Notamment lorsqu'une Consultation a été demandée préalablement à la demande de suppression des informations personnelles, les CGU concernant la mise en oeuvre de la Consultation.`}</Text>
            <Text style={TextStyle.line}>{`6.4. Conséquences de la résiliation`}</Text>
            <Text style={TextStyle.line}>{`La résiliation des CGU pour quelque cause que ce soit peut entraîner l’arrêt automatique et définitif de l’accès à l’Application et aux Services.`}</Text>
            <Text style={TextStyle.line}>{`En cas de manquement par l’Utilisateur aux présentes CGU, Laboratoires Scientia Natura se réserve le droit de suspendre sans préavis ni indemnité l’accès aux Services de l’Application par tout procédé technique qui pourrait s’avérer nécessaire, et notamment par la suppression, temporaire ou définitive, de ses informations, la modification, la limitation ou la suppression de l'accès aux Services, sans que l’Utilisateur ne puisse réclamer aucune indemnité quelconque.`}</Text>
            <Text style={TextStyle.line}>{`Le cas échéant, Laboratoires Scientia Natura sera en droit de réclamer des indemnités destinées à compenser le préjudice subi.`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 7 : Protection des données à caractère personnel : loi Informatique et Libertés`}</Text>
            <Text style={TextStyle.line}>{`Les informations collectées par l'intermédiaire des formulaires présents sur l’Application contiennent des données à caractère personnel au sens de la loi n° 78-17 du 6 janvier 1978 modifiée relative à l’informatique, aux fichiers et aux libertés (ci-après la loi « Informatique et Libertés »). Elles sont destinées à Laboratoires Scientia Natura afin de pouvoir traiter les demandes des Utilisateurs, d’échanger avec les Utilisateurs, de réaliser des études et des analyses et de proposer à l'Utilisateur de meilleurs Services.`}</Text>
            <Text style={TextStyle.line}>{`Les informations recueillies peuvent faire l’objet d’une transmission à des partenaires. Ces informations sont confidentielles et conservées par Scientia Natura, ou ses partenaires.`}</Text>
            <Text style={TextStyle.line}>{`Conformément à la loi "Informatique et Libertés" n°78-17 du 6 janvier 1978 modifiée relative à l’informatique, aux fichiers et aux libertés, vous disposez d'un droit d'accès, de rectification et de suppression de ces données ainsi que du droit de vous opposer à ce que ces données fassent l'objet d'un traitement en nous contactant :`}</Text>
            <Text style={TextStyle.line}>{`Soit par courrier à l'adresse suivante :`}<Text style={[TextStyle.bullet, TextStyle.bold]}>{` Scientia Natura - 23 rue Alphand, 75013 Paris`}</Text></Text>
            <Text style={TextStyle.line}>{`Soit par message électronique à l'adresse donnees@Flora Natura.com`}</Text>
            <Text style={TextStyle.line}>{`Merci de : Préciser vos nom, prénom et adresse postale et de joindre une copie recto-verso de votre pièce d'identité.`}</Text>
            <Text style={TextStyle.line}>{`Les postulants aux offres d’emploi ou de stages ont la possibilité d’exercer leur droit d'accès, de rectification et de suppression de leurs données personnelles via la même démarche.`}</Text>
            <Text style={TextStyle.line}>{`L'Utilisateur accepte que Laboratoires Scientia Natura puisse leur envoyer des informations relatives à son activité, ou des offres promotionnelles de certains de ses partenaires. Si l'Utilisateur souhaite ne plus recevoir ce type d'information, il peut en faire la demande par simple email à donnees@Flora Natura.eu`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 8 : Cookie ou repère de connexion`}</Text>
            <Text style={TextStyle.line}>{`Définition d’un cookie : Un cookie est un petit fichier alphanumérique qui est déposé dans le terminal de votre ordinateur, smartphone, tablette, mobile, etc, lors de votre connexion sur notre Application. Il a vocation à collecter des informations relatives à votre navigation et à vous transmettre en retour des indications ou services personnalisées.`}</Text>
            <Text style={TextStyle.line}>{`Lors de votre connexion à l’Application, des cookies seront stockés dans la mémoire de votre ordinateur, smartphone, tablette, mobile. Les informations ainsi collectées ne sont utilisées que par Laboratoires Scientia Natura et ne sont pas cédées à des tiers. Ils enregistrent des informations relatives à la navigation de votre ordinateur sur notre Application (les pages que vous avez consultées, la date et l'heure de la consultation, etc.) que nous pourrons lire lors de vos viapplications ultérieures. Vous avez, par ailleurs, la possibilité de les effacer de votre terminal à tout moment.`}</Text>
            <Text style={TextStyle.line}>{`Laboratoires  Scientia Natura utilisera différents types de cookies, dont vous trouverez ci-dessous la finalité accompagnée d’une brève description :`}</Text>
            <Text style={TextStyle.line}><Text style={[TextStyle.bullet, TextStyle.bold]}>{`■  Cookies indispensables à la navigation: `}</Text>{`grâce à ce type de cookies, vous pouvez naviguer sur notre Application internet et en utiliser les différentes fonctionnalités. Ce type de cookies est nécessaire pour assurer votre identification et l’accès à votre compte. Sans ces cookies, notre Application internet ne fonctionnerait pas correctement et vous ne seriez pas en mesure d’utiliser les fonctionnalités précitées.`}</Text>
            <Text style={TextStyle.line}><Text style={[TextStyle.bullet, TextStyle.bold]}>{`■  Cookies Google Analytics: `}</Text>{`Ces cookies nous permettent d’enregistrer certaines informations qui ont pour but d’analyser vos connexions afin de quantifier le volume de fréquentation sur notre Application puis d’élaborer des études qualitatives visant à améliorer la présentation de notre Application et l’information diffusées sur nos produits. Ces cookies sont utilisés à des fins d’optimisation de notre Application internet.`}</Text>
            <Text style={TextStyle.line}><Text style={[TextStyle.bullet, TextStyle.bold]}>{`■  Comment désactiver les cookies Google Analytics:`}</Text>  {`_ Nom du cookie utilisé : _ga _ Type de cookie : Cookie d'analyse de l'audience de la Application et des indicateurs de performances marketing`}</Text>
            <Text style={TextStyle.line}>{`Vous pouvez refuser l'utilisation et le dépôt de ce cookie sur votre terminal en vous rendant sur https://tools.google.com/dlpage/gaoptout?Hl=fr`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 9 : Application de la loi Suisse`}</Text>
            <Text style={TextStyle.line}>{`Le non-respect des présentes dispositions expose le contrevenant à des poursuites et à des sanctions pénales. Le présent texte est régi et interprété selon le droit suisse et relève de la compétence exclusive des tribunaux suisse. Si l'une des dispositions du présent texte s'avérait nulle, non valide ou sans effet juridique, toutes les autres dispositions demeureraient applicables.`}</Text>
          </View>
          <View style={TextStyle.paragraph}>
            <Text style={TextStyle.Heading1}>{`Article 10 : Nullité partielle - Dissociation`}</Text>
            <Text style={TextStyle.line}>{`Dans l'hypothèse où une disposition des présentes CGU serait déclarée nulle, illégale, inopposable ou inapplicable d'une manière quelconque, la validité, la légalité ou l'application des autres dispositions des présentes CGU n'en seraient aucunement affectées ou altérées, les autres stipulations des CGU demeurant en vigueur et conservant leur plein et entier effet.`}</Text>
          </View >
        </Content >
      </Container >
    )
  }
}
const TextStyle = StyleSheet.create({
  paragraph: {
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  Heading1: {
    color: "#000",
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Montserrat-Bold',
    marginTop: 12,
    marginBottom: 4,
  },
  Heading2: {
    color: "#000",
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Montserrat-Medium',
    marginTop: 12,
    marginBottom: 4,
  },
  Heading3: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Montserrat-Regular',
    marginTop: 10,
    marginBottom: 2,
  },
  line: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    marginVertical: 8,
  },
  bold: {
    fontFamily: 'Montserrat-Bold',
  },
  bullet: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    marginLeft: 10,
    paddingLeft: 10,
    marginVertical: 4,
  },
  bullet2: {
    fontSize: 14,
    fontFamily: 'Montserrat-Light',
    marginLeft: 10,
    marginVertical: 4,
    paddingLeft: 20,
  },
})