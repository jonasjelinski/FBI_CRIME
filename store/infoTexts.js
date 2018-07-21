// infoTextsNamespace contains all html-texts
//which contain informations about the pages
//they are used in the pages and the statemachines
//to describe the pages

var infoTextsNamespace = infoTextsNamespace || {};


infoTextsNamespace.shortPageDescription = {
  startPage: "<p>Diese Webseite soll einen Überblick über die verübten Verbrechen in den USA geben.</p>",
  mapInfo : "<p>Auf dieser Seite können Sie sich einen Überblick über die verschiedenen ausgeübten Verbrechen in den einzelnen Staaten der USA verschaffen</p>",
  lineChartInfo: "<p>Auf dieser Seite können Sie über den kompletten erfassten Zeitraum die verübten Verbrechen miteinander vergleichen.</p>",
  correlationInfo: "<p>Alle erfassten Kategorien werden auf dieser Seite miteinander verknüft und die bestehende Korrelation dargestellt.</p>",
  universeInfo: "<p>Darstellung der zwei Überkategorien als Sonnen und aller Staaten als Planeten</p>",
  popupInfo: "<p>blablubbbbbbbb</p>",
}

infoTextsNamespace.longPageDescription = {
  startPage: "<p>Diese Webseite soll einen Überblick über die verübten Verbrechen in den USA geben. Die zugrundeliegenden Daten wurden vom FBI (Federal Bureau of Investigation) zur Verfügung gestellt und sind öffentlich abrufbar.</p><p>Die Statistiken beziehen sich auf die Jahre 2000 bis 2016. Alle Daten wurden in verschiednen Grafiken aufbereitet und bieten dem Nutzer die Möglichkeit, sich verschiedene Details anzusehen und sich auf diese zu fokussieren.</p><p>Auf den verschiedenen Einzelseiten gibt es einen Info-Button, der eine genaue Erklärung der dargestellten Grafik anzeigt.</p>",
  mapPage: "<p>Sie können die einzelnen Verbrechen im DropDown-Menü auswählen. Die gesamte Karte bezieht sich jeweils nur auf das ausgewählte Verbrechen.</p><p>Die Farbe im jeweiligen Staat gibt einen ersten Eindruck über die Rate des angezeigten Verbrechens: je heller der Farbton wird, umso geringer war die Verbrechensrate; je dunkler und röter der Farbton ist, umso höher war die Verbrechensrate.</p><p>In der Zeitleiste oben können Sie gezielt ein Jahr auswählen oder mit dem Play-Button alle Jahre nacheinander anzeigen.</p><p>Wenn Sie mit der Maus über die einzelnen Staaten gehen, wird Ihnen der Name des Staates angezeigt sowie die Anzahl der Opfer pro 100.000 Einwohner.</p><p>Für Detailinformationen über den jeweiligen Staat können Sie auf diesen klicken.</p>",
  popupPage: "<p>Sie sehen für den Staat Detail-Informationen.</p><p>Im linken Bildschirmbereich können Sie durch Mausklicks die einzelnen Unterkategorieren öffnen und schließen und so jedes einzelne Verbrechen genau ansehen. Ist eine Kategorie komplett geöffnet, wird ......</p><p>Im rechten Bildschirmbereich können Sie sich erneut einen Überblick über die im ausgewählten Staat erfassten Verbrechen machen. Diese sind vom FBI in die zwei Kategorien Gewalt- und Vermögensdelikte aufgeteilt und mit weiteren Kategorien versehen.</p>",
  lineChartPage: "<p>Im DropDown-Menü im linken Bereich wählen Sie bitte einen Staat der USA aus.</p><p>Zentral können Sie ein Diagramm mit den Jahren als horizontale Achse und der Rate der Verbrechen pro 100.000 Einwohner als vertikale Achse sehen. Die abgebildeten Daten können Sie mit der Linie im linken Bildschirmbereich vergleichen.</p><p>Sie können für einen gezielteren Vergleich in der Legende einzelne Verbrechen ab- und wieder anwählen.</p>",
  correlationPage: "<p>Die berechneten Korrelationen der Verbrechenskategorieen untereinander beziehen sich auf die komplette USA und den kompletten Zeitraum.</p><p>Jede Kategorie wird als ein Kreis angezeigt, der mit der Maus auf dem Bildschirm positioniert werden kann. Beim Berühren des KReises mit der Maus werden alle Verbindungen hervorgehoben. Anhand der angezeigten Skala kann die Korrelation eingeschätzt werden. Für einen genauen numerischen Wert kann der Verbindung zwischen zwei Kategorien mit der Maus berührt werden.</p><p>Die numerischen Werte liegen im Bereich zwischen -1 und 1.</p>",
  universePage: "<p>Die zwei Sonnen (Gewalt- und Vermögensdelikte) üben auf die Planeten Anziehungskräfte aus. Je näher ein Planet an einer Sonne angezeigt wird, umso mehr Verbrechen dieser Kategorie wurden ausgeübt.</p><p>Jeder Staat in den USA wird einmalig angezeigt. Je nach den verübten Verbrechen in diesem Staat, ordnet er sich einer Sonne unter. Um die Namen der Staaten deutlicher lesen zu können, kann der Planet mit der Maus berührt werden.</p><p>In der Zeitleiste im oberen Bildschirmbereich kann ein Jahr ausgewählt werden, das angezeigt werden soll.</p><p>Der Play-Button lässt das Sonnensystem rotieren.</p>",
  dataRegulationPage: "<p> Hier können Sie die Datenschutzerklärung lesen",
  impressumPage: "<p> Hier können Sie das Impressum lesen",
}

infoTextsNamespace.legal = {
  dataRegulationText:"<div><h1>Allgemeine Hinweise</h1><p>Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung. Datenschutz</p><p>Diese Datenschutzerklärung soll die Nutzer dieser Website über die Art, den Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch den Webseitenbetreiber informieren.</p> <p>Wenn Sie diese Website benutzen, werden keine personenbezogenen Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.</p> <p>Definitionen der verwendeten Begriffe (z.B. “personenbezogene Daten” oder “Verarbeitung”) finden Sie in Art. 4 DSGVO.</p> <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p> <p><strong>Angaben zum Verantwortlichen</strong></p> <p>Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen sind:<p> <p>Nina Hösl, Jonas Jelinski, Christian Lisik</p><p><strong>Kontakt:</strong> <br> E-Mail: <a href='mailto:nina.hoesl@stud.uni.regensburg.de'>nina.hoesl@stud.uni-regensburg.de</a></br></p><p>Die verarbeitende Stelle ist auch gemeint, wenn im Folgenden die Begriffe „wir“ oder „uns“ verwendet werden.</p><p><stron>Bereitstellung der Website und Erstellung von Logfiles</strong></p><p>Wir, der Websitebetreiber bzw. Seitenprovider, erheben keine Daten über Zugriffe auf die Website und speichern diese. </p>",
  impressumText: "<div><h1>Impressum</h1><p>Angaben gemäß § 5 TMG</p><p>Nina Hösl, Jonas Jelinski, Christian Lisik</p><p><strong>Kontakt:</strong> <br>E-Mail: <a href='mailto:nina.hoesl@stud.uni.regensburg.de'>nina.hoesl at stud.uni-regensburg.de</a></br></p><p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br> Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br> Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br> Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br></p><br></div>",
}

infoTextsNamespace.startPageTexts = {
  map :"<p> <img src='./pictures/MapChart.png' alt='MapChart'> Sie wollen eine geographische Übersicht über die Verteilung der Vebrechen in den USA?  Klicken Sie auf Map !<p>",
  lineChart : " <p> <img src='./pictures/LineChart.png' alt='LineChart'> Sie wollen die Entwicklung Vebrechen im Zeitverlauf verfolgen?  Klicken Sie auf TimeLine !<p>",
  correlation:" <p> <img src='./pictures/CorrelationChart.png' alt='CorrelationChart'> Sie wollen wissen wie verschiedene Vebrechen miteinander korrelieren?  Klicken Sie auf Correlation !<p>",
  universe: "<p> <img src='./pictures/UniverseChart.png' alt='UniverseChart'> Sie wollen eine Übersicht über das Verhältnis von Gewalt- zu Eigentumsdelikten? Klicken Sie auf Universe!<p></p>",
}

//this is used to show the text of the startpage
infoTextsNamespace.startPage = {
  startPage: infoTextsNamespace.startPageTexts.map + infoTextsNamespace.startPageTexts.lineChart+infoTextsNamespace.startPageTexts.correlation+ infoTextsNamespace.startPageTexts.universe,
}
