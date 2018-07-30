/*---INFO TEXTS--*/

// infoTextsNamespace contains all html-texts
//which contain informations about the pages
//they are used in the pages and the statemachines
//to describe the pages

var infoTextsNamespace = infoTextsNamespace || {};

infoTextsNamespace.shortPageDescription = {
	startPage: "<p> This website gives an overview of the crimes committed in the USA between 2000 and 2016, recorded by the Federal Bureau of Investigation (FBI).Hover the pictures with your mouse to see what the websites offers you.</p>",
	mapInfo : "<p>Here you can see a color map representing the different crimes committed in each state of the USA per 100 000 inhabitants.</p>",
	lineChartInfo: "<p>On this page you can see the crimes committed over the entire recorded period through a line chart and compare two states.</p>",
	correlationInfo: "<p>All recorded crimecategories are linked together on this page and their correlation is displayed through the color of the links.</p>",
	universeInfo: "<p>The solar systems represent the two super-categories 'violent-crimes' and 'property-crimes'. All states are assigned as planets showing which state fits in which super-category in comparison to other states.</p>",
	popupInfo: "<p>Here you can see crimedetails about your choosen state.<br>On the left you can open a tree to see the number of crimes per 100 000 inhabitants.<br>On the right you can see the percentage of each crime as a sunburst. You can hover the sunburst.</p>",
};

infoTextsNamespace.buttonPageDescription = {
	startPage: "<p>Return to the startpage!",
	mapInfo : "<p>Choose this page to see a color map representing the different crimes committed in each state of the USA.</p>",
	lineChartInfo: "<p>Compare the crimes committed over the entire recorded period through a line chart? Choose Timeline!</p>",
	correlationInfo: "<p>Find out everything about the correlations between the different crimes!</p>",
	universeInfo: "<p>Which state is more violent in comparison to other states? Click here to see the distribution as an universe.</p>",
	popupInfo: "<p>Here you can see crimedetails about your choosen state.</br>On the left you can open a tree to see the number of crimes per 100 000 inhabitants.</p><p>On the right you can see the percentage of each crime as a sunburst. You can hover the sunburst.</p>",
};

infoTextsNamespace.longPageDescription = {
	startPage: "<p>This website is intended to give an overview of the crimes committed in the USA. The underlying data was provided by the Federal Bureau of Investigation (FBI) and is publicly available.</p><p> The statistics refer to the years 2000 to 2016. All data has been prepared in different graphics and offers the user the possibility to look at different details and to focus on them.</ p> <p> On the various individual pages, there is an info button that displays a detailed explanation of the graphic shown.</p>",
	mapPage: "<p>You can select the individual crimes in the drop-down menu. The entire map only pertains to the selected crime.</p><p>The color in each state gives a first impression of the rate of crime displayed: the brighter the hue, the lower the crime rate; the darker and redder the hue, the higher the crime rate.</p><p>In the timeline above, you can select a specific year or use the play button to take a journey through time.</p><p> If you hover the individual states the name of the state and the number of victims per 100,000 inhabitants is displayed.</p><p>For detailed information about the respective state, you can click on each state.</p>",
	popupPage: "<p>You can explore details of the selected state.</p><p>On the left you can open and close the individual subcategories by mouse clicks and look closely at each individual crime. If a category is completely open, you get the numerical value of the crime.</p><p>On the right you can once again review the crimes recorded in the selected state. These are divided by the FBI into the two categories of violent and property crime and provided with further categories.</p><p>The dropdown menu at the top allows you to select a year.</p>",
	lineChartPage: "<p>You can select a state in the dropdown menu at the top.</p><p>At the center you see a graph with the years as the horizontal axis and the crime rate per 100.000 population as the vertical axis. You can compare the displayed data with the legend at the top.</p><p>You can select and redo individual crimes for a better comparison in the legend.</p><p>To have a better view to the details of the data you can zoom inte the chart.</p><p>Both linediagrams have the same function. You can use them to compare tweo states.</p>",
	correlationPage: "<p>The calculated correlations of the crime categories among themselves refer to the entire US and the entire time span.</p><p>Each category is displayed as a circle that can be positioned with the mouse on the screen. Touching the circle with the mouse highlights all links. You can also hover the links to highlight them, you will see the numerical value of the correlation.</p><p>Based on the displayed scale the correlation can be estimated using the color of the link.</p> <p>The numeric values range from -1 to 1. The closer the value is to 0, the lower the correlation. The closer the value is to 1, the higher the correlation. The algebraic sign indicates whether there is a negative or positive correlation.</p>",
	universePage: "<p>The two suns in the middle represent the two categories of property and violent crime. Each planet represents a state that revolves around a sun. The sum of the planets form a solar system.</p><p>The redder a planet is, the more violent crimes are perpetrated in the state in comparison to the other states. In addition, the number of property offenses increases the attraction to the respective sun. Planets that are closer to a sun have more property offenses than planets that are farther away from the same sun in the same solar system.</p><p>A state is reported in the violent crimes (the right sun), if in this state more violent than property crimes were committed in comparison to the other states.</p><p>With the timeline at the top you can choose a year. The play button starts a rotate simulation. More violent planets are slightly slower than less violent planets. The speed highly depends on your cpu performance.</p>",
	dataRegulationPage: "<p>Here you can read the privacy policy.</p>",
	impressumPage: "<p>Here you can read the imprint.</p>",
};

infoTextsNamespace.legal = {
	dataRegulationText:"<div><h1>Allgemeine Hinweise</h1><p>Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung. Datenschutz</p><p>Diese Datenschutzerklärung soll die Nutzer dieser Website über die Art, den Umfang und den Zweck der Erhebung und Verwendung personenbezogener Daten durch den Webseitenbetreiber informieren.</p> <p>Wenn Sie diese Website benutzen, werden keine personenbezogenen Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.</p> <p>Definitionen der verwendeten Begriffe (z.B. “personenbezogene Daten” oder “Verarbeitung”) finden Sie in Art. 4 DSGVO.</p> <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p> <p><strong>Angaben zum Verantwortlichen</strong></p> <p>Der Verantwortliche im Sinne der Datenschutz-Grundverordnung und anderer nationaler Datenschutzgesetze der Mitgliedsstaaten sowie sonstiger datenschutzrechtlicher Bestimmungen sind:<p> <p>Nina Hösl, Jonas Jelinski, Christian Lisik</p><p><strong>Kontakt:</strong> <br> E-Mail: <a href='mailto:nina.hoesl@stud.uni.regensburg.de'>nina.hoesl@stud.uni-regensburg.de</a></br></p><p>Die verarbeitende Stelle ist auch gemeint, wenn im Folgenden die Begriffe „wir“ oder „uns“ verwendet werden.</p><p><stron>Bereitstellung der Website und Erstellung von Logfiles</strong></p><p>Wir, der Websitebetreiber bzw. Seitenprovider, erheben keine Daten über Zugriffe auf die Website und speichern diese. </p>",
	impressumText: "<div><h1>Impressum</h1><p>Angaben gemäß § 5 TMG</p><p>Nina Hösl, Jonas Jelinski, Christian Lisik</p><p><strong>Kontakt:</strong> <br>E-Mail: <a href='mailto:nina.hoesl@stud.uni.regensburg.de'>nina.hoesl@stud.uni-regensburg.de</a></br></p><p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br> Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br> Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br> Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br></p><br></div>",
};

infoTextsNamespace.startPageTexts = {
	map : { infoText: "'MAP' gives you an overview of the geographical crime distribution in the United States.", buttonText: "Please click now on the big 'Map' icon or use the buttons in the headline to get to the map."},
	lineChart : { infoText: " On the page 'TIMELINE' you can look at individual states and the crimes committed there in an annual comparison.", buttonText: "Please click now on the big 'Timeline' icon or use the buttons in the headline to see the line chart." },
	correlation: { infoText: "'CORRELATION' shows the correlation between all crimes. You can investigate the result in a 3d animation.", buttonText: "Please click now on the big 'Correlation' icon or use the buttons in the headline to see the correlation" },
	universe: {infoText: "'UNIVERSE' contains an overview of the distribution of violent and property crimes between states.", buttonText: "Please click now on the big 'Universe' icon or use the buttons in the headline to get to the universe." },
};
