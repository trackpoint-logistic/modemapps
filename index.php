<?php

$dom = new DOMDocument();
$dom->validateOnParse = false;
$dom->formatOutput = true;

$dom->loadHTML(file_get_contents('index.html'),LIBXML_NOWARNING | LIBXML_NOERROR);

while($include = $dom->getElementsByTagName('include')->item(0)){
	$src = $include->getAttribute('src');
	error_log($src);
	$fragment = $dom->createDocumentFragment();

	$fragment->appendXML(file_get_contents($include->getAttribute('src')));

	$include->parentNode->replaceChild($fragment, $include); 
}

$dom->normalize();

echo $dom->saveHTML();
?>