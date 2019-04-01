<?php
//============================================================+
// File name   : example_003.php
// Begin       : 2008-03-04
// Last Update : 2013-05-14
//
// Description : Example 003 for TCPDF class
//               Custom Header and Footer
//
// Author: Nicola Asuni
//
// (c) Copyright:
//               Nicola Asuni
//               Tecnick.com LTD
//               www.tecnick.com
//               info@tecnick.com
//============================================================+

/**
 * Creates an example PDF TEST document using TCPDF
 * @package com.tecnick.tcpdf
 * @abstract TCPDF - Example: Custom Header and Footer
 * @author Nicola Asuni
 * @since 2008-03-04
 */
//echo 76;
// Include the main TCPDF library (search for installation path).
//require_once('tcpdf/examples/tcpdf_include.php');
require_once ('../html2pdf/tcpdf/tcpdf.php');
//require_once('tcpdf_include.php');
//echo 88; exit;

class MYPDF extends TCPDF {
    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom


        $this->SetY(30);
        $this->SetX(28);
        // Set font
        //$this->SetFont('helvetica', 8);
        // Page number
        //$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        //$this->Cell(0, 10, $this->getAliasNumPage(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        //$this->Cell(0, 10, 'Confidentiality Agreement', 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
}


$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);


// create new PDF document
//$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
/*$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Nicola Asuni');
$pdf->SetTitle('TCPDF Example 021');
$pdf->SetSubject('TCPDF Tutorial');
$pdf->SetKeywords('TCPDF, PDF, example, test, guide');*/

// set default header data
/*$pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 021', PDF_HEADER_STRING);*/

// set header and footer fonts
$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

//set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);

$pdf->SetLeftMargin(2);
$pdf->SetRightMargin(2);







//$pdf->SetY(50);


$pdf->setPrintHeader(false);
//$pdf->setPrintFooter(false);

$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);






// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}



// ---------------------------------------------------------

// set font
//$pdf->SetFont('helvetica', '', 9);
//$pdf->SetFont('helvetica');



// add a page
$pdf->AddPage();

// create some HTML content
/*$html = '<h1>Example of HTML text flow</h1>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. <em>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</em> <em>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</em><br /><br /><b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i><br /><br /><b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u>';*/

$id = $_GET['id'];
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => "http://greenvalleyportal.com:2998/getpatientrecordforpdf?id=".$id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
));
$headers = [];
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
$response = curl_exec($curl);
$err = curl_error($curl);
//print_r($err);
/*echo "<pre>";
print_r(($response));
echo "</pre>";*/
$result=json_decode($response);
$result = $result->item;
/*echo "<pre>";
print_r($result);
echo "</pre>";
echo $result->phone;
exit;*/

$curl1 = curl_init();
curl_setopt_array($curl1, array(
    CURLOPT_URL => "http://greenvalleyportal.com:2998/getpatientuniqueidforpatientrecordforpdf?id=".$result->patientid,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
));
$headers1 = [];
curl_setopt($curl1, CURLOPT_HTTPHEADER, $headers1);
$response1 = curl_exec($curl1);
$err1 = curl_error($curl1);
$result1=json_decode($response1);
$result1 = $result1->item;
$result1uniqueid = $result1->uniqueid;



$curl2 = curl_init();
curl_setopt_array($curl2, array(
    CURLOPT_URL => "http://greenvalleyportal.com:2998/getrepidforpatientrecordforpdf?id=".$result1->addedby,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
));
$headers2 = [];
curl_setopt($curl2, CURLOPT_HTTPHEADER, $headers1);
$response2 = curl_exec($curl2);
$err2 = curl_error($curl2);
$result2=json_decode($response2);
$result2 = $result2->item;
$result2uniqueid = $result2->uniqueid;
/*echo $result->cgx;
echo $result->oralpain;
exit;*/
if($result->cgx==1){
    $result->cgx = 'checked';
}
else{
    $result->cgx = 'false';
}
if($result->pgxval==1){
    $result->pgxval = 'checked';
}
else{
    $result->pgxval = 'false';
}
if($result->insurance1==1){
    $result->insurance1 = 'checked';
}
else{
    $result->insurance1 = 'false';
}
if($result->insurance2==1){
    $result->insurance2 = 'checked';
}
else{
    $result->insurance2 = 'false';
}
if($result->insurance3==1){
    $result->insurance3 = 'checked';
}
else{
    $result->insurance3 = 'false';
}
if($result->insurance4==1){
    $result->insurance4 = 'checked';
}
else{
    $result->insurance4 = 'false';
}
if($result->oralpain==1){
    $result->oralpain = 'checked';
}
else{
    $result->oralpain = 'false';
}

if($result->topicalpain==1){
    $result->topicalpain = 'checked';
}
else{
    $result->topicalpain = 'false';
}

if($result->derma==1){
    $result->derma = 'checked';
}
else{
    $result->derma = 'false';
}

if($result->migrane==1){
    $result->migrane = 'checked';
}
else{
    $result->migrane = 'false';
}
if($result->diabetic_sup==1){
    $result->diabetic_sup = 'Yes';
}
else{
    $result->diabetic_sup = 'No';
}
if($result->wound_sup==1){
    $result->wound_sup = 'Yes';
}
else{
    $result->wound_sup = 'No';
}

if($result->pain_sup==1){
    $result->pain_sup = 'Yes';
}
else{
    $result->pain_sup = 'No';
}

if($result->topical_sup==1){
    $result->topical_sup = 'Yes';
}
else{
    $result->topical_sup = 'No';
}

if($result->braces_sup==1){
    $result->braces_sup = 'Yes';
}
else{
    $result->braces_sup = 'No';
}
if($result->walker_sup==1){
    $result->walker_sup = 'Yes';
}
else{
    $result->walker_sup = 'No';
}

if($result->scooter_sup==1){
    $result->scooter_sup = 'Yes';
}
else{
    $result->scooter_sup = 'No';
}
if($result->allergies_sup==1){
    $result->allergies_sup = 'Yes';
}
else{
    $result->allergies_sup = 'No';
}
if($result->catheters_sup==1){
    $result->catheters_sup = 'Yes';
}
else{
    $result->catheters_sup = 'No';
}
if($result->cancer_sup==1){
    $result->cancer_sup = 'Yes';
}
else{
    $result->cancer_sup = 'No';
}
if($result->mediprimarypolicy==1){
    $result->mediprimarypolicy = 'Yes';
}
else{
    $result->mediprimarypolicy = 'No';
}
if($result->planbcard==1){
    $result->planbcard = 'Yes';
}
else{
    $result->planbcard = 'No';
}
if($result->comprimarypolicy==1){
    $result->comprimarypolicy = 'Yes';
}
else{
    $result->comprimarypolicy = 'No';
}

if($result->medadvantageprimarypolicy==1){
    $result->medadvantageprimarypolicy = 'Yes';
}
else{
    $result->medadvantageprimarypolicy = 'No';
}
if($result->comprimarypolicy==1){
    $result->comprimarypolicy = 'Yes';
}
else{
    $result->comprimarypolicy = 'No';
}



if($result->insurance1_1==1){
    $result->insurance1_1 = 'checked';
}
else{
    $result->insurance1_1 = 'false';
}
if($result->insurance2_1==1){
    $result->insurance2_1 = 'checked';
}
else{
    $result->insurance2_1 = 'false';
}
if($result->insurance3_1==1){
    $result->insurance3_1 = 'checked';
}
else{
    $result->insurance3_1 = 'false';
}
if($result->insurance4_1==1){
    $result->insurance4_1 = 'checked';
}
else{
    $result->insurance4_1 = 'false';
}
if($result->mediprimarypolicy_1==1){
    $result->mediprimarypolicy_1 = 'Yes';
}
else{
    $result->mediprimarypolicy_1 = 'No';
}
if($result->planbcard_1==1){
    $result->planbcard_1 = 'Yes';
}
else{
    $result->planbcard_1 = 'No';
}
if($result->medadvantageprimarypolicy_1==1){
    $result->medadvantageprimarypolicy_1 = 'Yes';
}
else{
    $result->medadvantageprimarypolicy_1 = 'No';
}
if($result->comprimarypolicy_1==1){
    $result->comprimarypolicy_1 = 'Yes';
}
else{
    $result->comprimarypolicy_1 = 'No';
}


if($result->insurance1_2==1){
    $result->insurance1_2 = 'checked';
}
else{
    $result->insurance1_2 = 'false';
}
if($result->insurance2_2==1){
    $result->insurance2_2 = 'checked';
}
else{
    $result->insurance2_2 = 'false';
}
if($result->insurance3_2==1){
    $result->insurance3_2 = 'checked';
}
else{
    $result->insurance3_2 = 'false';
}
if($result->insurance4_2==1){
    $result->insurance4_2 = 'checked';
}
else{
    $result->insurance4_2 = 'false';
}
if($result->mediprimarypolicy_2==1){
    $result->mediprimarypolicy_2 = 'Yes';
}
else{
    $result->mediprimarypolicy_2 = 'No';
}
if($result->planbcard_2==1){
    $result->planbcard_2 = 'Yes';
}
else{
    $result->planbcard_2 = 'No';
}
if($result->medadvantageprimarypolicy_2==1){
    $result->medadvantageprimarypolicy_2 = 'Yes';
}
else{
    $result->medadvantageprimarypolicy_2 = 'No';
}
if($result->comprimarypolicy_2==1){
    $result->comprimarypolicy_2 = 'Yes';
}
else{
    $result->comprimarypolicy_2 = 'No';
}

if($result->insurance1_3==1){
    $result->insurance1_3 = 'checked';
}
else{
    $result->insurance1_3 = 'false';
}
if($result->insurance2_3==1){
    $result->insurance2_3 = 'checked';
}
else{
    $result->insurance2_3 = 'false';
}
if($result->insurance3_3==1){
    $result->insurance3_3 = 'checked';
}
else{
    $result->insurance3_3 = 'false';
}
if($result->insurance4_3==1){
    $result->insurance4_3 = 'checked';
}
else{
    $result->insurance4_3 = 'false';
}
if($result->mediprimarypolicy_3==1){
    $result->mediprimarypolicy_3 = 'Yes';
}
else{
    $result->mediprimarypolicy_3 = 'No';
}
if($result->planbcard_3==1){
    $result->planbcard_3 = 'Yes';
}
else{
    $result->planbcard_3 = 'No';
}
if($result->medadvantageprimarypolicy_3==1){
    $result->medadvantageprimarypolicy_3 = 'Yes';
}
else{
    $result->medadvantageprimarypolicy_3 = 'No';
}
if($result->comprimarypolicy_3==1){
    $result->comprimarypolicy_3 = 'Yes';
}
else{
    $result->comprimarypolicy_3 = 'No';
}
/*-------*/

if($result->insurance1_4==1){
    $result->insurance1_4 = 'checked';
}
else{
    $result->insurance1_4 = 'false';
}
if($result->insurance2_4==1){
    $result->insurance2_4 = 'checked';
}
else{
    $result->insurance2_4 = 'false';
}
if($result->insurance3_4==1){
    $result->insurance3_4 = 'checked';
}
else{
    $result->insurance3_4 = 'false';
}
if($result->insurance4_4==1){
    $result->insurance4_4 = 'checked';
}
else{
    $result->insurance4_4 = 'false';
}
if($result->mediprimarypolicy_4==1){
    $result->mediprimarypolicy_4 = 'Yes';
}
else{
    $result->mediprimarypolicy_4 = 'No';
}
if($result->planbcard_4==1){
    $result->planbcard_4 = 'Yes';
}
else{
    $result->planbcard_4 = 'No';
}
if($result->medadvantageprimarypolicy_4==1){
    $result->medadvantageprimarypolicy_4 = 'Yes';
}
else{
    $result->medadvantageprimarypolicy_4 = 'No';
}
if($result->comprimarypolicy_4==1){
    $result->comprimarypolicy_4 = 'Yes';
}
else{
    $result->comprimarypolicy_4 = 'No';
}
/*-------*/

if($result->insurance1_5==1){
    $result->insurance1_5 = 'checked';
}
else{
    $result->insurance1_5 = 'false';
}
if($result->insurance2_5==1){
    $result->insurance2_5 = 'checked';
}
else{
    $result->insurance2_5 = 'false';
}
if($result->insurance3_5==1){
    $result->insurance3_5 = 'checked';
}
else{
    $result->insurance3_5 = 'false';
}
if($result->insurance4_5==1){
    $result->insurance4_5 = 'checked';
}
else{
    $result->insurance4_5 = 'false';
}
if($result->mediprimarypolicy_5==1){
    $result->mediprimarypolicy_5 = 'Yes';
}
else{
    $result->mediprimarypolicy_5 = 'No';
}
if($result->planbcard_5==1){
    $result->planbcard_5 = 'Yes';
}
else{
    $result->planbcard_5 = 'No';
}
if($result->medadvantageprimarypolicy_5==1){
    $result->medadvantageprimarypolicy_5 = 'Yes';
}
else{
    $result->medadvantageprimarypolicy_5 = 'No';
}
if($result->comprimarypolicy_5==1){
    $result->comprimarypolicy_5 = 'Yes';
}
else{
    $result->comprimarypolicy_5 = 'No';
}
/*-------*/

if($result->insurance1_6==1){
    $result->insurance1_6 = 'checked';
}
else{
    $result->insurance1_6 = 'false';
}
if($result->insurance2_6==1){
    $result->insurance2_6 = 'checked';
}
else{
    $result->insurance2_6 = 'false';
}
if($result->insurance3_6==1){
    $result->insurance3_6 = 'checked';
}
else{
    $result->insurance3_6 = 'false';
}
if($result->insurance4_6==1){
    $result->insurance4_6 = 'checked';
}
else{
    $result->insurance4_6 = 'false';
}
if($result->mediprimarypolicy_6==1){
    $result->mediprimarypolicy_6 = 'Yes';
}
else{
    $result->mediprimarypolicy_6 = 'No';
}
if($result->planbcard_6==1){
    $result->planbcard_6 = 'Yes';
}
else{
    $result->planbcard_6 = 'No';
}
if($result->medadvantageprimarypolicy_6==1){
    $result->medadvantageprimarypolicy_6 = 'Yes';
}
else{
    $result->medadvantageprimarypolicy_6 = 'No';
}
if($result->comprimarypolicy_6==1){
    $result->comprimarypolicy_6 = 'Yes';
}
else{
    $result->comprimarypolicy_6 = 'No';
}

/*---------------------------------------common_cancer 555--------------------------------------*/

$curl4 = curl_init();
curl_setopt_array($curl4, array(
    CURLOPT_URL => "http://greenvalleyportal.com:3020/getcommoncancersymptomsforpdf?id=".$id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
));
$headers4 = [];
curl_setopt($curl4, CURLOPT_HTTPHEADER, $headers4);
$response4 = curl_exec($curl4);
$err4 = curl_error($curl4);
//print_r($err);
$result4=json_decode($response4);
$result4 = $result4->item;
/*echo "<pre>";
print_r($result4);
echo "</pre>";
exit;*/
if($result4->weightloss==1){
    $result4->weightloss = 'checked';
}
else{
    $result4->weightloss = 'false';
}
if($result4->appetite==1){
    $result4->appetite = 'checked';
}
else{
    $result4->appetite = 'false';
}



if($result4->difficulty_swallowing==1){
    $result4->difficulty_swallowing = 'checked';
}
else{
    $result4->difficulty_swallowing = 'false';
}
if($result4->sorethroat==1){
    $result4->sorethroat = 'checked';
}
else{
    $result4->sorethroat = 'false';
}
if($result4->chroniccough==1){
    $result4->chroniccough = 'checked';
}
else{
    $result4->chroniccough = 'false';
}
if($result4->inflammatorypolyps==1){
    $result4->inflammatorypolyps = 'checked';
}
else{
    $result4->inflammatorypolyps = 'false';
}
if($result4->urinationurgency==1){
    $result4->urinationurgency = 'checked';
}
else{
    $result4->urinationurgency = 'false';
}


if($result4->lowerbackpain==1){
    $result4->lowerbackpain = 'checked';
}
else{
    $result4->lowerbackpain = 'false';
}
if($result4->pelvicpain==1){
    $result4->pelvicpain = 'checked';
}
else{
    $result4->pelvicpain = 'false';
}
if($result4->gaspain==1){
    $result4->gaspain = 'checked';
}
else{
    $result4->gaspain = 'false';
}
if($result4->legpain==1){
    $result4->legpain = 'checked';
}
else{
    $result4->legpain = 'false';
}
if($result4->hearingloss==1){
    $result4->hearingloss = 'checked';
}
else{
    $result4->hearingloss = 'false';
}
if($result4->skinchanges==1){
    $result4->skinchanges = 'checked';
}
else{
    $result4->skinchanges = 'false';
}
if($result4->swollenabdomen==1){
    $result4->swollenabdomen = 'checked';
}
else{
    $result4->swollenabdomen = 'false';
}
if($result4->eatingdisorder==1){
    $result4->eatingdisorder = 'checked';
}
else{
    $result4->eatingdisorder = 'false';
}
if($result4->unabdominalpain==1){
    $result4->unabdominalpain = 'checked';
}
else{
    $result4->unabdominalpain = 'false';
}
if($result4->upabdominalpain==1){
    $result4->upabdominalpain = 'checked';
}
else{
    $result4->upabdominalpain = 'false';
}
if($result4->ruquadrantpain==1){
    $result4->ruquadrantpain = 'checked';
}
else{
    $result4->ruquadrantpain = 'false';
}
if($result4->luquadrantpain==1){
    $result4->luquadrantpain = 'checked';
}
else{
    $result4->luquadrantpain = 'false';
}
if($result4->labdominalpain==1){
    $result4->labdominalpain = 'checked';
}
else{
    $result4->labdominalpain = 'false';
}
if($result4->rlquadrantpain==1){
    $result4->rlquadrantpain = 'checked';
}
else{
    $result4->rlquadrantpain = 'false';
}
if($result4->llquadrantpain==1){
    $result4->llquadrantpain = 'checked';
}
else{
    $result4->llquadrantpain = 'false';
}
if($result4->gabdominalpain==1){
    $result4->gabdominalpain = 'checked';
}
else{
    $result4->gabdominalpain = 'false';
}
if($result4->vomiting1==1){
    $result4->vomiting1 = 'checked';
}
else{
    $result4->vomiting1 = 'false';
}
if($result4->vomiting2==1){
    $result4->vomiting2 = 'checked';
}
else{
    $result4->vomiting2 = 'false';
}
if($result4->vomiting3==1){
    $result4->vomiting3 = 'checked';
}
else{
    $result4->vomiting3 = 'false';
}
if($result4->chronicfatigue==1){
    $result4->chronicfatigue = 'checked';
}
else{
    $result4->chronicfatigue = 'false';
}
if($result4->otherfatigue==1){
    $result4->otherfatigue = 'checked';
}
else{
    $result4->otherfatigue = 'false';
}
if($result4->anemia==1){
    $result4->anemia = 'checked';
}
else{
    $result4->anemia = 'false';
}
if($result4->jaundice==1){
    $result4->jaundice = 'checked';
}
else{
    $result4->jaundice = 'false';
}
if($result4->fatigue1==1){
    $result4->fatigue1 = 'checked';
}
else{
    $result4->fatigue1 = 'false';
}
if($result4->fatigue2==1){
    $result4->fatigue2 = 'checked';
}
else{
    $result4->fatigue2 = 'false';
}
if($result4->type1diabetes==1){
    $result4->type1diabetes = 'checked';
}
else{
    $result4->type1diabetes = 'false';
}
if($result4->type2diabetes==1){
    $result4->type2diabetes = 'checked';
}
else{
    $result4->type2diabetes = 'false';
}
if($result4->constipation==1){
    $result4->constipation = 'checked';
}
else{
    $result4->constipation = 'false';
}
if($result4->abnormalweightloss==1){
    $result4->abnormalweightloss = 'checked';
}
else{
    $result4->abnormalweightloss = 'false';
}
if($result4->abnormalweightgain==1){
    $result4->abnormalweightgain = 'checked';
}
else{
    $result4->abnormalweightgain = 'false';
}
if($result4->hypertrophicdisorders==1){
    $result4->hypertrophicdisorders = 'checked';
}
else{
    $result4->hypertrophicdisorders = 'false';
}
if($result4->bloodinstool==1){
    $result4->bloodinstool = 'checked';
}
else{
    $result4->bloodinstool = 'false';
}
if($result4->skineruption==1){
    $result4->skineruption = 'checked';
}
else{
    $result4->skineruption = 'false';
}
if($result4->xerosiscutis==1){
    $result4->xerosiscutis = 'checked';
}
else{
    $result4->xerosiscutis = 'false';
}

if($result4->lumpinbreast==1){
    $result4->lumpinbreast = 'checked';
}
else{
    $result4->lumpinbreast = 'false';
}

if($result4->thickeningbreast==1){
    $result4->thickeningbreast = 'checked';
}
else{
    $result4->thickeningbreast = 'false';
}

if($result4->disordersofbreast==1){
    $result4->disordersofbreast = 'checked';
}
else{
    $result4->disordersofbreast = 'false';
}

if($result4->nipplepain==1){
    $result4->nipplepain = 'checked';
}
else{
    $result4->nipplepain = 'false';
}

if($result4->rednessnipple==1){
    $result4->rednessnipple = 'checked';
}
else{
    $result4->rednessnipple = 'false';
}


if($result4->breastsize==1){
    $result4->breastsize = 'checked';
}
else{
    $result4->breastsize = 'false';
}


if($result4->breastpain==1){
    $result4->breastpain = 'checked';
}
else{
    $result4->breastpain = 'false';
}

if($result4->noofbloodclots==1){
    $result4->noofbloodclots = 'checked';
}
else{
    $result4->noofbloodclots = 'false';
}

if($result4->nippledischarge==1){
    $result4->nippledischarge = 'checked';
}
else{
    $result4->nippledischarge = 'false';
}

if($result4->uterinebleeding==1){
    $result4->uterinebleeding = 'checked';
}
else{
    $result4->uterinebleeding = 'false';
}

if($result4->bloodinurine==1){
    $result4->bloodinurine = 'checked';
}
else{
    $result4->bloodinurine = 'false';
}
if($result4->melena==1){
    $result4->melena = 'checked';
}
else{
    $result4->melena = 'false';
}
if($result4->stomachpainabdominalpain==1){
    $result4->stomachpainabdominalpain = 'checked';
}
else{
    $result4->stomachpainabdominalpain = 'false';
}
if($result4->bowelhabits==1){
    $result4->bowelhabits = 'checked';
}
else{
    $result4->bowelhabits = 'false';
}
if($result4->unconstipation==1){
    $result4->unconstipation = 'checked';
}
else{
    $result4->unconstipation = 'false';
}
if($result4->diarrhea==1){
    $result4->diarrhea = 'checked';
}
else{
    $result4->diarrhea = 'false';
}
if($result4->colonpolyps==1){
    $result4->colonpolyps = 'checked';
}
else{
    $result4->colonpolyps = 'false';
}
if($result4->rectalbleeding==1){
    $result4->rectalbleeding = 'checked';
}
else{
    $result4->rectalbleeding = 'false';
}
if($result4->abdominalbloating1==1){
    $result4->abdominalbloating1 = 'checked';
}
else{
    $result4->abdominalbloating1 = 'false';
}
if($result4->abdominalbloating2==1){
    $result4->abdominalbloating2 = 'checked';
}
else{
    $result4->abdominalbloating2 = 'false';
}
if($result4->idefecation==1){
    $result4->idefecation = 'checked';
}
else{
    $result4->idefecation = 'false';
}
if($result4->ofecalabnormalities==1){
    $result4->ofecalabnormalities = 'checked';
}
else{
    $result4->ofecalabnormalities = 'false';
}
if($result4->pancreaticuabdominalpain==1){
    $result4->pancreaticuabdominalpain = 'checked';
}
else{
    $result4->pancreaticuabdominalpain = 'false';
}
if($result4->cholecystitis1==1){
    $result4->cholecystitis1 = 'checked';
}
else{
    $result4->cholecystitis1 = 'false';
}
if($result4->cholecystitis2==1){
    $result4->cholecystitis2 = 'checked';
}
else{
    $result4->cholecystitis2 = 'false';
}

/*---------------------------------------PGX 555-----------------------------------*/

$curl5 = curl_init();
curl_setopt_array($curl5, array(
    CURLOPT_URL => "http://greenvalleyportal.com:3020/getmedicationpgxforpdf?id=".$id,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"
));
$headers5 = [];
curl_setopt($curl5, CURLOPT_HTTPHEADER, $headers5);
$response5 = curl_exec($curl5);
$err5 = curl_error($curl5);
//print_r($err);
$result5=json_decode($response5);
$result5 = $result5->item;
/*echo "<pre>";
print_r($result);
echo "</pre>";*/
if($result5->lithium==1){
    $result5->lithium = 'checked';
}
else{
    $result5->lithium = 'false';
}
if($result5->abilify==1){
    $result5->abilify = 'checked';
}
else{
    $result5->abilify = 'false';
}
if($result5->seroquel==1){
    $result5->seroquel = 'checked';
}
else{
    $result5->seroquel = 'false';
}
if($result5->clonazepam==1){
    $result5->clonazepam = 'checked';
}
else{
    $result5->clonazepam = 'false';
}
if($result5->latuda==1){
    $result5->latuda = 'checked';
}
else{
    $result5->latuda = 'false';
}
if($result5->valium==1){
    $result5->valium = 'checked';
}
else{
    $result5->valium = 'false';
}
if($result5->ativan==1){
    $result5->ativan = 'checked';
}
else{
    $result5->ativan = 'false';
}
if($result5->zyprexa==1){
    $result5->zyprexa = 'checked';
}
else{
    $result5->zyprexa = 'false';
}
if($result5->xanax==1){
    $result5->xanax = 'checked';
}
else{
    $result5->xanax = 'false';
}
if($result5->zoloft==1){
    $result5->zoloft = 'checked';
}
else{
    $result5->zoloft = 'false';
}
if($result5->celexa==1){
    $result5->celexa = 'checked';
}
else{
    $result5->celexa = 'false';
}
if($result5->paxil==1){
    $result5->paxil = 'checked';
}
else{
    $result5->paxil = 'false';
}
if($result5->cymbalta==1){
    $result5->cymbalta = 'checked';
}
else{
    $result5->cymbalta = 'false';
}
if($result5->klonopin==1){
    $result5->klonopin = 'checked';
}
else{
    $result5->klonopin = 'false';
}
if($result5->waellbutrin==1){
    $result5->waellbutrin = 'checked';
}
else{
    $result5->waellbutrin = 'false';
}
if($result5->prozac==1){
    $result5->prozac = 'checked';
}
else{
    $result5->prozac = 'false';
}
if($result5->lexapro==1){
    $result5->lexapro = 'checked';
}
else{
    $result5->lexapro = 'false';
}
if($result5->amitriptyline==1){
    $result5->amitriptyline = 'checked';
}
else{
    $result5->amitriptyline = 'false';
}
if($result5->viibryd==1){
    $result5->viibryd = 'checked';
}
else{
    $result5->viibryd = 'false';
}
if($result5->trazodone==1){
    $result5->trazodone = 'checked';
}
else{
    $result5->trazodone = 'false';
}
if($result5->nitros==1){
    $result5->nitros = 'checked';
}
else{
    $result5->nitros = 'false';
}
if($result5->heartattack==1){
    $result5->heartattack = 'checked';
}
else{
    $result5->heartattack = 'false';
}
if($result5->lipitor==1){
    $result5->lipitor = 'checked';
}
else{
    $result5->lipitor = 'false';
}
if($result5->crestor==1){
    $result5->crestor = 'checked';
}
else{
    $result5->crestor = 'false';
}
if($result5->zocor==1){
    $result5->zocor = 'checked';
}
else{
    $result5->zocor = 'false';
}
if($result5->mevacor==1){
    $result5->mevacor = 'checked';
}
else{
    $result5->mevacor = 'false';
}
if($result5->skinrash==1){
    $result5->skinrash = 'checked';
}
else{
    $result5->skinrash = 'false';
}
if($result5->prilosec==1){
    $result5->prilosec = 'checked';
}
else{
    $result5->prilosec = 'false';
}
if($result5->zantac==1){
    $result5->zantac = 'checked';
}
else{
    $result5->zantac = 'false';
}

if($result5->nexium==1){
    $result5->nexium = 'checked';
}
else{
    $result5->nexium = 'false';
}

if($result5->neurontin==1){
    $result5->neurontin = 'checked';
}
else{
    $result5->neurontin = 'false';
}

if($result5->triamcinolone==1){
    $result5->triamcinolone = 'checked';
}
else{
    $result5->triamcinolone = 'false';
}

if($result5->clobex==1){
    $result5->clobex = 'checked';
}
else{
    $result5->clobex = 'false';
}

if($result5->fluocinonide==1){
    $result5->fluocinonide = 'checked';
}
else{
    $result5->fluocinonide = 'false';
}

if($result5->betamethasone==1){
    $result5->betamethasone = 'checked';
}
else{
    $result5->betamethasone = 'false';
}

function showinproperform($val)
{
    $k = str_replace('_', '', $val);
    $k = preg_replace('/\d+/u', '', $k);
    $ki = implode(",", $k);
    return $ki;
}

function show($val,$familyrelation)
{
//$name = 'familyrelation'.$val;
//echo $name;
//echo $result->$name;
//echo $result->familyrelation1;
    if($familyrelation == 'Mother' || $familyrelation == 'Father' || $familyrelation == 'Brother' || $familyrelation == 'Sister' || $familyrelation == 'Son' || $familyrelation == 'Daughter'){
        return '1st Degree';
    }
    else if($familyrelation == 'Uncle' || $familyrelation == 'Aunt' ){
        return '2nd Degree';
    }
    else if($familyrelation == 'Nephew' || $familyrelation == 'Niece' || $familyrelation == 'Cousin' || $familyrelation == 'Grand Father' || $familyrelation == 'Grand Mother'){
        return '3rd Degree';
    }
    else{
        return '';
    }
}

//echo $result->familyrelation1;
//exit;
/*---------------------------------------- html for pps 555 -----------------------------------------*/

$html = '


  

<table style="width: 100%; padding: 6px 0; background-color: #1C83B4;">
  <tr>
  
   <td style="text-align: center;  vertical-align: middle;">
    
    <table style="width: 100%;">
  <tr>
  
   <td style="text-align: center; width: 30%;">&nbsp; </td>
   
   <td style="text-align: center;  background-color: #295b73 ; width:4%;"> <img src="training_page_iconpdf.png" alt="#" style="line-height: 10px; width:50px;"> </td>
     
      <td style="text-align: center; vertical-align: middle; background-color: #295b73 ; width:36%;    font-size:13px!important;
    color: #fefefe;text-transform: uppercase;"><h1 style="font-size:18px; line-height:34px;">PATIENT PROFILE SHEET </h1></td>
  <td style="text-align: center; width: 30%;">&nbsp; </td>
  </tr> 

</table>
        

    </td>
  </tr>
 
</table>


<table style="width: 100%; padding: 6px 0 6px 0;">
  <tr>
   <td style=" vertical-align: middle;  width: 155px;     color: #295b73; font-size: 13px; "> <span>PRODUCT REQUESTED</span>
  </td>
  <td style=" vertical-align: middle;   width: 60px;    font-size: 12px;
    color: #295b73"><!--<span style="display: block"><input type="checkbox" name="box" value="1" readonly="true" />DME</span><br/>
   <span style="display: block"><input type="checkbox" name="box" value="1" readonly="true" />Rx</span><br/>
    <span style="display: block"><input type="checkbox" name="box" value="1" readonly="true" />PGX</span><br/>-->
  
<span style="display: block"><input type="checkbox" name="box1" id="box1" value="1" readonly="true"  checked="'.$result->cgx.'" />CGX</span><br/>
&nbsp;&nbsp;<span style="display: block"><input type="checkbox" name="box1" id="box1" value="1" readonly="true"  checked="'.$result->pgxval.'" />PGX</span>
   
   </td>
   
     <td style=" vertical-align: middle;  width:50px;  color: #295b73; font-size: 10px;" valign="middle"> <span>Patient Id:</span>
</td>

 <td style=" vertical-align: middle;  width: 90px; color: #295b73; font-size: 10px;" valign="bottom">  <u>#'.$result1uniqueid.'</u></td>
   
  <td style=" vertical-align: middle;  width:520px; color: #295b73; font-size: 11px;" valign="middle"><span>Medigrade Health Group - 1845 San Marco Rd #301, Marco Island, FL 34145, USA
</span>
</td>
</tr>

</table>



<table style="width: 100%; border-top: solid 1px #000; padding-bottom:13px; padding-top: 6px;">

 <tr>
 
   <td width="50%;"><span style="font-size: 13px; color: #295b73;  "><u>PATIENT INFORMATION</u></span>
      <br/>   
      <table style="width: 100%;">
        <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>First Name:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->firstname.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Last Name:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->lastname.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Best Phone #:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->phone.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Address:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->address.' </td>
        
         </tr>
         
         <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>City:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->city.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>State:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->state.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Zip:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->zip.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Date of Birth:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->dob.' </td>
        
         </tr>
         
        
         <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Gender:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->gender.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Race/Ethnicity:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->race.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 30%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>HT/WT :</span> *</td>
          <td  style=" color: #5b5c5c; width: 31.5%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->height.' </td>
          <td  style=" color: #5b5c5c; width: 7%; text-align: center;  font-size: 12px; line-height: 20px; padding: 0px;">/</td>
          <td  style=" color: #5b5c5c; width: 31.5%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->width.' </td>
        
         </tr>
      
      
      </table>
      
      
   
   </td>
   
   <td width="2%;">&nbsp;</td>
   <td width="48%;">
   
   <!-- <table style="width: 100%; ">
         <br/>   <br/>  
         
          
           <tr>
          <td style="width: 36%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Allergies :</span> *</td>
          <td collapse="3" style="  color: #5b5c5c; width: 65%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->allergies.' </td>
        
         </tr>
           <tr>
          <td style="width: 36%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>Medicare Claim # :</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 65%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medicareclaim.' </td>
        
         </tr>
   
</table>


   <span style="font-size: 13px; color: #295b73;"><u>SPECIAL NOTES</u></span>
     <br/>    
      <table style="width: 100%; ">
        <tr>
          <td style="width: 10%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>A) :</span></td>
          <td style=" color: #5b5c5c; width:90%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->notes1.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 10%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>B) :</span></td>
          <td style=" color: #5b5c5c; width:90%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->notes2.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 10%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>C) :</span></td>
          <td style=" color: #5b5c5c; width:90%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->notes3.' </td>
        
         </tr>
           <tr>
          <td style="width: 10%; font-size: 12px; color: #5b5c5c; line-height: 20px;"><span>D) :</span></td>
          <td style=" color: #5b5c5c; width:90%; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->notes4.' </td>
        
         </tr>
         
         
      
      
      </table>
      
      -->
   
</td>
 
 </tr>
 
 </table>



<span style="font-size: 13px; color: #295b73;  text-transform: uppercase;"><u>MEDICAL INSURANCE INFORMATION</u></span><br/>

<!--MEDICAL INSURANCE INFORMATION--->

<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance1.'"/><span style="color: #295b73;">Medicare</span></span>&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance2.'"/><span style="color: #295b73;">Medadvantage</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance3.'"/><span style="color: #295b73;">Commercial</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance4.'"/><span style="color: #295b73;">None</span></span>';
if($result->insurance1 == 'checked'){
    $html1 = '
<span style=" font-size: 12px; color: #337AB7; ">Medicare Details</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->mediprimarypolicy.'</td>
</tr>

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Do you have the plan B card?:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->planbcard.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medicarepolicyno.'</td>
</tr></table>';
}
if($result->insurance2 == 'checked'){
    $html2='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Med-Advantage Details</span>
<br/>

<table style="width: 100%;">
<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageprimarypolicy.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageplan.'</td>
</tr>

<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantagepolicyno.'</td>
</tr></table>';
}

if($result->insurance3 == 'checked'){
    $html3='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Commercial Details</span>

<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->comprimarypolicy.'</td>
</tr>


<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Carrier:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->carrier.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierplan.'</td>
</tr>
<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierpolicyno.'</td>
</tr>
</table> ';
}

if($result->insurance4=='1'){
    $html4='<span style=" font-size: 12px; color: #333; line-height: 20px;">You may pay cash for this test if you do not have a health insurance policy.</span>
  
  <br/>  
  <hr/>
  ';
}

if($result->insurance1_1=='checked' || $result->insurance2_1=='checked' || $result->insurance3_1=='checked' || $result->insurance4_1=='checked'){
    $html5='<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance1_1.'"/><span style="color: #295b73;">Medicare</span></span>&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance2_1.'"/><span style="color: #295b73;">Medadvantage</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance3_1.'"/><span style="color: #295b73;">Commercial</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance4_1.'"/><span style="color: #295b73;">None</span></span>';
    if($result->insurance1_1=='checked'){
        $html6='
<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Medicare Details</span>
<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->mediprimarypolicy_1.'</td>
</tr>

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Do you have the plan B card?:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->planbcard_1.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medicarepolicyno_1.'</td>
</tr></table> ';
    }

    if($result->insurance2_1=='checked'){
        $html7='
<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Med-Advantage Details</span>
<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageprimarypolicy_1.'</td>
</tr>


<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageplan_1.'</td>
</tr>

<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantagepolicyno_1.'</td>
</tr></table>';
    }

    if($result->insurance3_1=='checked'){
        $html8='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Commercial Details</span>
<br/>


<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->comprimarypolicy_1.'</td>
</tr>


<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Carrier:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->carrier_1.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierplan_1.'</td>
</tr>
<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierpolicyno_1.'</td>
</tr>
</table>    
       
   
';
    }

    if($result->insurance4_1=='checked'){
        $html9='
<table style="width: 100%;">
<tr>
<td style=" font-size: 12px; color: #333; line-height: 20px;">You may pay cash for this test if you do not have a health insurance policy.

</td>
</tr>
</table>   
  <br/>  
  <hr/>
  <!--MEDICAL INSURANCE INFORMATION end--->
  ';
    }

}

if($result->insurance1_2=='checked' || $result->insurance2_2=='checked' || $result->insurance3_2=='checked' || $result->insurance4_2=='checked'){
    $html10='

   <!--MEDICAL INSURANCE INFORMATION--->

<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance1_2.'"/><span style="color: #295b73;">Medicare</span></span>&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance2_2.'"/><span style="color: #295b73;">Medadvantage</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance3_2.'"/><span style="color: #295b73;">Commercial</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance4_2.'"/><span style="color: #295b73;">None</span></span>';
    if($result->insurance1_2=='checked'){
        $html11='
<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Medicare Details</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->mediprimarypolicy_2.'</td>
</tr>

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Do you have the plan B card?:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->planbcard_2.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medicarepolicyno_2.'</td>
</tr>


</table> 



 ';
    }


    if($result->insurance2_2=='checked'){
        $html12='
<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Med-Advantage Details</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageprimarypolicy_2.'</td>
</tr>


<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageplan_2.'</td>
</tr>

<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantagepolicyno_2.'</td>
</tr></table>';
    }

    if($result->insurance3_2=='checked'){
        $html13='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Commercial Details
</span>

<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->comprimarypolicy_2.'</td>
</tr>


<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Carrier:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->carrier_2.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierplan_2.'</td>
</tr>
<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierpolicyno_2.'</td>
</tr>
</table>    
       
    
';
    }

    if($result->insurance4_2=='checked'){
        $html14='
<table style="width: 100%;">
<tr>
<td style=" font-size: 12px; color: #333; line-height: 20px;">You may pay cash for this test if you do not have a health insurance policy.

</td>
</tr>
</table>   
  <br/>  
  <hr/>
  ';
    }

}

if($result->insurance1_3=='checked' || $result->insurance2_3=='checked' || $result->insurance3_3=='checked' || $result->insurance4_3=='checked'){
    $html15='
  <!--MEDICAL INSURANCE INFORMATION end--->
   
<!--MEDICAL INSURANCE INFORMATION--->

<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance1_3.'"/><span style="color: #295b73;">Medicare</span></span>&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance2_3.'"/><span style="color: #295b73;">Medadvantage</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance3_3.'"/><span style="color: #295b73;">Commercial</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance4_3.'"/><span style="color: #295b73;">None</span></span>';
    if($result->insurance1_3=='checked'){
        $html16='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Medicare Details</span>
<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->mediprimarypolicy_3.'</td>
</tr>

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Do you have the plan B card?:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->planbcard_3.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medicarepolicyno_3.'</td>
</tr>


</table> 




 ';
    }

    if($result->insurance2_3=='checked'){
        $html17='
<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Med-Advantage Details</span>
<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageprimarypolicy_3.'</td>
</tr>


<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageplan_3.'</td>
</tr>

<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantagepolicyno_3.'</td>
</tr></table>';
    }

    if($result->insurance3_3=='checked'){
        $html18='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Commercial Details
</span>


<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->comprimarypolicy_3.'</td>
</tr>


<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Carrier:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->carrier_3.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierplan_3.'</td>
</tr>
<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierpolicyno_3.'</td>
</tr>
</table>    
       ';
    }

    if($result->insurance4_3=='checked'){
        $html19='
    

<table style="width: 100%;">
<tr>
<td style=" font-size: 12px; color: #333; line-height: 20px;">You may pay cash for this test if you do not have a health insurance policy.

</td>
</tr>
</table>   
  <br/>  
  <hr/>
  
  
  
  <!--MEDICAL INSURANCE INFORMATION end--->
   
   
  
  <br/>
</td>
</tr>

</table>
 ';
    }

}


if($result->insurance1_4=='checked' || $result->insurance2_4=='checked' || $result->insurance3_4=='checked' || $result->insurance4_4=='checked'){
    $html41='
  <!--MEDICAL INSURANCE INFORMATION end--->
   
<!--MEDICAL INSURANCE INFORMATION--->

<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance1_4.'"/><span style="color: #295b73;">Medicare</span></span>&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance2_4.'"/><span style="color: #295b73;">Medadvantage</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance3_4.'"/><span style="color: #295b73;">Commercial</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance4_4.'"/><span style="color: #295b73;">None</span></span>';
    if($result->insurance1_4=='checked'){
        $html53='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Medicare Details</span>
<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->mediprimarypolicy_4.'</td>
</tr>

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Do you have the plan B card?:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->planbcard_4.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medicarepolicyno_4.'</td>
</tr>


</table> ';
    }

    if($result->insurance2_4=='checked'){
        $html42='
<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Med-Advantage Details</span>
<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageprimarypolicy_4.'</td>
</tr>


<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageplan_4.'</td>
</tr>

<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantagepolicyno_4.'</td>
</tr></table>';
    }

    if($result->insurance3_4=='checked'){
        $html43='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Commercial Details</span>

<br/>
<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->comprimarypolicy_4.'</td>
</tr>


<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Carrier:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->carrier_4.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierplan_4.'</td>
</tr>
<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierpolicyno_4.'</td>
</tr>
</table>    
       ';
    }

    if($result->insurance4_4=='checked'){
        $html44='
     

<table style="width: 100%;">
<tr>
<td style=" font-size: 12px; color: #333; line-height: 20px;">You may pay cash for this test if you do not have a health insurance policy.

</td>
</tr>
</table>   
  <br/>  
  <hr/>
  
  
  
  <!--MEDICAL INSURANCE INFORMATION end--->
   
   
  
  <br/>
</td>
</tr>

</table>
 ';
    }

}


if($result->insurance1_5=='checked' || $result->insurance2_5=='checked' || $result->insurance3_5=='checked' || $result->insurance4_5=='checked'){
    $html45='
  <!--MEDICAL INSURANCE INFORMATION end--->
   
<!--MEDICAL INSURANCE INFORMATION--->

<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance1_5.'"/><span style="color: #295b73;">Medicare</span></span>&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance2_5.'"/><span style="color: #295b73;">Medadvantage</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance3_5.'"/><span style="color: #295b73;">Commercial</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance4_5.'"/><span style="color: #295b73;">None</span></span>';
    if($result->insurance1_5=='checked'){
        $html54='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Medicare Details</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->mediprimarypolicy_5.'</td>
</tr>

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Do you have the plan B card?:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->planbcard_5.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medicarepolicyno_5.'</td>
</tr>


</table> ';
    }

    if($result->insurance2_5=='checked'){
        $html46='
<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Med-Advantage Details</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageprimarypolicy_5.'</td>
</tr>


<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageplan_5.'</td>
</tr>

<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantagepolicyno_5.'</td>
</tr></table>';
    }

    if($result->insurance3_5=='checked'){
        $html47='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Commercial Details
</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->comprimarypolicy_5.'</td>
</tr>


<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Carrier:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->carrier_5.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierplan_5.'</td>
</tr>
<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierpolicyno_5.'</td>
</tr>
</table>    
       ';
    }

    if($result->insurance4_5=='checked'){
        $html48='
     

<table style="width: 100%;">
<tr>
<td style=" font-size: 12px; color: #333; line-height: 20px;">You may pay cash for this test if you do not have a health insurance policy.

</td>
</tr>
</table>   
  <br/>  
  <hr/>
  
  
  
  <!--MEDICAL INSURANCE INFORMATION end--->
   
   
  
  <br/>
</td>
</tr>

</table>
 ';
    }

}


if($result->insurance1_6=='checked' || $result->insurance2_6=='checked' || $result->insurance3_6=='checked' || $result->insurance4_6=='checked'){
    $html49='
  <!--MEDICAL INSURANCE INFORMATION end--->
   
<!--MEDICAL INSURANCE INFORMATION--->

<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance1_6.'"/><span style="color: #295b73;">Medicare</span></span>&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance2_6.'"/><span style="color: #295b73;">Medadvantage</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance3_6.'"/><span style="color: #295b73;">Commercial</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance4_6.'"/><span style="color: #295b73;">None</span></span>';
    if($result->insurance1_6=='checked'){
        $html55='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Medicare Details</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->mediprimarypolicy_6.'</td>
</tr>

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Do you have the plan B card?:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->planbcard_6.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medicarepolicyno_6.'</td>
</tr>


</table> 




 ';
    }
    if($result->insurance2_6=='checked'){
        $html50='

<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Med-Advantage Details</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageprimarypolicy_6.'</td>
</tr>


<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantageplan_6.'</td>
</tr>

<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->medadvantagepolicyno_6.'</td>
</tr></table>';
    }
    if($result->insurance3_6=='checked'){
        $html51='<span style=" font-size: 12px; color: #337AB7; line-height: 20px;">Commercial Details</span>
<br/>

<table style="width: 100%;">

<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->comprimarypolicy_6.'</td>
</tr>


<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Carrier:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->carrier_6.'</td>
</tr>
<tr>
<td style="width: 170px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierplan_6.'</td>
</tr>
<tr>
<td style="width: 170px; font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierpolicyno_6.'</td>
</tr>
</table>    
       ';
    }
    if($result->insurance4_6=='checked'){
        $html52='
      

<table style="width: 100%;">
<tr>
<td style=" font-size: 12px; color: #333; line-height: 20px;">You may pay cash for this test if you do not have a health insurance policy.

</td>
</tr>
</table>   
  <br/>  
  <hr/>
  
  
  
  <!--MEDICAL INSURANCE INFORMATION end--->
   
   
  
  <br/>
</td>
</tr>

</table>
 ';
    }
}

$html20='
<table style="width: 100%;  border-top: solid 1px #000; padding-top:6px;">

<tr>
<td>
<span style="font-size: 13px; color: #295b73;  text-transform: uppercase;"><u>PATIENT QUESTIONNAIRE<!-- for "data farming"--></u></span><br/>


<table style="width: 100%; padding-top: 6px;">
<tr>
<td width="100%" >

<span style="display: block; font-size: 12px; color: #333; line-height: 17px; "><span style="color: #333;">Do you or anyone in your Immediate family take any medications ?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->diabetic_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333; ">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span> -->
</span>
<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you or anyone in your Immediate have Diabetes or use Diabetic supplies (Meter, strips, Lancets, Needles, etc)?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->wound_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>
<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you or any one in your Immediate wear Diabetic shoes?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->pain_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>

<br/>
<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you or anyone in your Immediate family require wound care supplies?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->topical_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>
<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you or anyone in your Immediate family use or have ever used topical creams for a pain relief?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->braces_sup.'</span></span> 
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>
<br/>
<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you or anyone in your Immediate family use or have ever had any back, knee, neck, elbow  pain or used a brace for relief?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->lastbrace.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>

<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you or any one in your Immediate family use catheters?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->walker_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>

<br/>
<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you or anyone in your Immediate family use a walker or Scooter?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->scooter_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>

<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you or anyone in your Immediate family have Allergies?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->allergies_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>
<br/>
<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Have you or has anyone in any part of your immediate or extended family ever had any type of cancer ?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->cancer_sup.'</span></span> 
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>


</td>

</tr>
</table>



</td>
</tr>
</table>





';
//if($result->cancer_sup=='Yes') {
$html21 = '
<table style="width: 100%;  border-top: solid 1px #000; padding-top:6px; padding-bottom: 6px;">

<tr>
<td collapse="8" style="padding-top: 10px;"><span style=" font-size: 13px; color: #295b73;"><u>CANCER QUESTIONNAIRE</u></span></td>
</tr>

   <tr>
   <td style="width:12%;"><span style=" font-size: 10px; color: #5b5c5c;">RELATIONSHIP</span></td>
   
     <td style="text-align:left; width:14%;"><span style=" font-size: 10px; color: #5b5c5c;">NAME</span></td>
     <td style="width:16%;"><span style=" font-size: 10px; color: #5b5c5c;">DEGREE OF SEPARATION</span></td>
       <td style="text-align:left; width:14%;"><span style=" font-size: 10px; color: #5b5c5c;">CANCER TYPE <span style="color: #ff0000">*</span></span></td>

      <td style="text-align:left; width:10%; "><span style=" font-size: 10px; color: #5b5c5c;">RELATION TYPE</span></td>
      <td style="text-align:left; width:10%;"><span style=" font-size: 10px; color: #5b5c5c;">DIAGNOSE STAGE</span></td>
      <td style="text-align:left; width:12%;  "><span style=" font-size: 10px; color: #5b5c5c;">AGE DIAGNOSED</span></td>
       <td style="text-align:center; width:12%;"><span style=" font-size: 10px; color: #5b5c5c;">IF DECEASED,<br/>AGE AT DEATH</span></td>
     
  <!-- <td style="width:16%; text-align: right;"><span style=" font-size: 12px; color: #295b73;"><u>MEDICATION LIST</u></span></td>-->
   
   </tr>

</table>
';
if ($result->familyrelation0 != null && $result->familyrelation0 != '') {
    $html22 = '

<table style="width: 100%;  padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation0 . '</td>
    </tr>
    </table>
   </td>
   
       <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->phname . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(0, $result->familyrelation0) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->phtype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation1 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->degree1 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->phage . '</td>
    </tr>
    </table>
   </td>
 
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->phdead . '</td>
    </tr>
    </table>
   </td>


   
   </tr>

</table>
';
}


if ($result->familyrelation1 != null && $result->familyrelation1 != '') {
    $html23 = '

<table style="width: 100%;  padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation1 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation1name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(1, $result->familyrelation1) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->motype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation2 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree2 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->moage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->modead . '</td>
    </tr>
    </table>


</td>

 
   
   </tr>

</table>
';
}

if ($result->familyrelation2 != null && $result->familyrelation2 != '') {
    $html24 = '
<table style="width: 100%;  padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation2 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation2name . '</td>
    </tr>
    </table>
   </td>
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(2, $result->familyrelation2) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->fatype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation3 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree3 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->faage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->fadead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation3 != null && $result->familyrelation3 != '') {
    $html25 = '
<table style="width: 100%;  padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation3 . '</td>
    </tr>
    </table>
   </td>
   
   
  <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation3name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(3, $result->familyrelation3) . '</td>
    </tr>
    </table>
   </td>
    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->dautype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation4 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree4 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->dauage . '</td>
    </tr>
    </table>
   </td>
 
<td 
 style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->daudead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation4 != null && $result->familyrelation4 != '') {
    $html26 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation4 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation4name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(4, $result->familyrelation4) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->sontype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation5 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree5 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->sonage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->sondead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation5 != null && $result->familyrelation5 != '') {
    $html27 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation5 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation5name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(5, $result->familyrelation5) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->brotype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation6 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree6 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->broage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->brodead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation6 != null && $result->familyrelation6 != '') {
    $html28 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation6 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation6name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(6, $result->familyrelation6) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->sistype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation7 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree7 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->sisage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->sisdead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation7 != null && $result->familyrelation7 != '') {
    $html29 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation7 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation7name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(7, $result->familyrelation7) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->neptype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation8 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree8 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->nepage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->nepdead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation8 != null && $result->familyrelation8 != '') {
    $html30 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation8 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation8name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(8, $result->familyrelation8) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->niecetype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation9 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree9 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->nieceage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->niecedead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation9 != null && $result->familyrelation9 != '') {
    $html31 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation9 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation9name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(9, $result->familyrelation9) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->unctype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation10 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation10 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->uncage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->uncdead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation10 != null && $result->familyrelation10 != '') {
    $html32 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation10 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation10name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(10, $result->familyrelation10) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->autntype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation11 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree11 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->autnage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->autndead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation11 != null && $result->familyrelation11 != '') {
    $html33 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation11 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation11name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(11, $result->familyrelation11) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->moftype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation12 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree12 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->mofage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->mofdead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation12 != null && $result->familyrelation12 != '') {
    $html34 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation12 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation12name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(12, $result->familyrelation12) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->momotype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation13 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree13 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->momoage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->momodead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}

if ($result->familyrelation13 != null && $result->familyrelation13 != '') {
    $html35 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation13 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation13name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(13, $result->familyrelation13) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->daftype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation14 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree14 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->dafage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->dafdead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation14 != null && $result->familyrelation14 != '') {
    $html36 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation14 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation14name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(14, $result->familyrelation14) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->damtype1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation15 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree15 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->damage . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->damdead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation15 != null && $result->familyrelation15 != '') {
    $html37 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation15 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation15name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(15, $result->familyrelation15) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->oth1type1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation16 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree16 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->oth1age . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->oth1dead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
if ($result->familyrelation16 != null && $result->familyrelation16 != '') {
    $html38 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation16 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation16name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(16, $result->familyrelation16) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->oth2type1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation17 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree17 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->oth2age . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->oth2dead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}


if ($result->familyrelation17 != null && $result->familyrelation17 != '') {
    $html39 = '
<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation17 . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->familyrelation17name . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . show(17, $result->familyrelation17) . '</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . showinproperform($result->oth3type1) . '</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->relation18 . '</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->degree18 . '</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">' . $result->oth3age . '</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">' . $result->oth3dead . '</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>
';
}
//}

$html40='


<table style="width: 100%;  border-top: solid 1px #000; padding-top:12px; ">
<tr>
 <td  style=" width:36%;font-size: 14px; line-height: 20px; padding: 0px;">&nbsp;</td>
  <td  style=" color: #646666; width:8%; font-size: 14px; line-height: 20px; padding: 0px;"><span style="font-size: 13px; color: #295b73;">Rep ID:</span></td>

 <td  style=" color: #646666; width:20%; border-bottom: solid 1px #646666; font-size: 14px; line-height: 20px; padding: 0px;">#'.$result2uniqueid.'</td>
 <td  style=" color: #646666; width:36%; font-size: 14px; line-height: 20px; padding: 0px;">&nbsp;</td>

</tr>
</table>





<div><br/><br/></div>
';
$html41='
<div style="font-size:0px">------------SYMPTOMS AND SIGNS--------------</div>


<table style="width: 100%; padding: 4px 0; background-color: #1C83B4;">
  <tr>
  
   <td style="text-align: center;  vertical-align: middle;">
    
    <table style="width: 100%;">
  <tr>
  
   <td style="text-align: center; width: 35%;">&nbsp; </td>
   
   <td style="text-align: center;  background-color: #295b73 ; width:4%;"> <img src="training_page_iconpdf.png" alt="#" style="line-height: 10px; width:50px;"> </td>
     
      <td style="text-align: center; vertical-align: middle; background-color: #295b73 ; width:26%;    font-size:14px!important;
    color: #fefefe;text-transform: uppercase;"><h1 style="font-size:14px; line-height:34px;">SYMPTOMS AND SIGNS</h1></td>
  <td style="text-align: center; width: 35%;">&nbsp; </td>
  </tr>

</table>


 </td>
  </tr>
 
</table>






<table style="width: 100%; padding: 6px 0; background-color: #fff;">

<tr>
<td>
<table style="width: 100%; padding: 0 6px; ">
 <tr>
<td style="padding: 4px 10px;  background-color: #19c6fe;">
<h1 style="font-size:14px; line-height:20px; color: #fff; padding: 0px 0; font-weight: bold; ">COMMON CANCER SYMPTOMS</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>

<table style="width: 100%; padding: 6px 0; background-color: #fff;">
<tr>
<td style="text-align: left; font-size: 11px; width: 50%;padding: 1px 10px; background-color: #fbfbfb;">
<table style="width: 100%; padding:2px 0;">
<tr>
<td style="text-align: left; font-size: 11px; ">

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Have you experienced unexplained weight loss?</span><br/><span style="padding: 0; color: #333;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->weightloss.'"/>Abnormal weight loss&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any unexplained loss of appetite?</span><br/>
<span style="padding: 0; color: #333;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->appetite.'"/>Anorexia&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->eatingdisorder.'"/>Other specified eating disorder&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Abdominal pain?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->unabdominalpain.'"/>Abdominal pain&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->upabdominalpain.'"/>Upper abdominal pain, unspecified&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->ruquadrantpain.'"/>Right upper quadrant pain&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->luquadrantpain.'"/>Left upper quadrant pain&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->labdominalpain.'"/>Lower abdominal pain, unspecified&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->rlquadrantpain.'"/>Right lower quadrant pain&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->llquadrantpain.'"/>Left lower quadrant pain&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->gabdominalpain.'"/>Generalized abdominal pain&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Nausea or vomiting?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->vomiting1.'"/>Nausea&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->vomiting2.'"/>Vomiting&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->vomiting3.'"/>Nausea with vomiting, unspecified&nbsp;&nbsp;</span>
</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any weakness or fatigue?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->chronicfatigue.'"/>Chronic fatigue, unspecified&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->otherfatigue.'"/>Fatigue&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Have you experienced any anemia?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->anemia.'"/>&nbspMultiple: Anemia, unspecified&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Do you have signs of Jaundice?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->jaundice.'"/>Unspecified jaundice&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;"> Any swallowing disorder?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->difficulty_swallowing.'"/>Difficulty Swallowing&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->sorethroat.'"/>Sore Throat&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;"> Sudden urge to urinate?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->urinationurgency.'"/>Urination urgency&nbsp;&nbsp;</span>


</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;"> Any pain in lower leg?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->legpain.'"/>Yes&nbsp;&nbsp;</span>


</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;"> Swollen Abdomen?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->swollenabdomen.'"/>Yes&nbsp;&nbsp;</span>


</td>

</tr>
 
</table>
 
</td>

<td style="text-align: left; font-size: 11px; width: 50%;padding: 1px 10px; background-color: #ebebeb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Feeling very tired all the time?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->fatigue1.'"/>Chronic fatigue, unspecified&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->fatigue2.'"/>Fatigue&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Do you have Diabetes?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->type1diabetes.'"/>Type 1 diabetes mellitus&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->type2diabetes.'"/>Type 2 diabetes mellitus&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Constipation?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->constipation.'"/>Constipation&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Abnormal weight loss?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->abnormalweightloss.'"/>Abnormal weight loss&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Abnormal weight gain?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->abnormalweightgain.'"/>Abnormal weight gain&nbsp;&nbsp;</span>
</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Skin tags?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->hypertrophicdisorders.'"/>Other hypertrophic disorders of the skin&nbsp;&nbsp;</span>
</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Blood in stool?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->bloodinstool.'"/>Occult blood in feces&nbsp;&nbsp;</span>
</td>

</tr>
 
</table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Dry Skin?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->skineruption.'"/>Rash and other nonspecific skin eruption&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->xerosiscutis.'"/>Xerosis cutis&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any shortness of breath and chest soreness?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->chroniccough.'"/>Chronic cough</span>
</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Lower back pain?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->lowerbackpain.'"/>Yes</span>
</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Hearing Loss?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->hearingloss.'"/>Yes</span>
</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any skin changes?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->skinchanges.'"/>Yes</span>
</td>

</tr>
 
</table>



</td>
</tr>
</table>



<table style="width: 100%; padding: 6px 0; background-color: #fff;">

<tr>
<td>
<table style="width: 100%; padding: 0 6px; ">
 <tr>
<td style="padding: 4px 10px;  background-color: #19c6fe;">
<h1 style="font-size:14px; line-height:20px; color: #fff; padding: 0px 0; font-weight: bold; ">BREAST CANCER SYMPTOMS</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>


<table style="width: 100%; padding:2px 0;">
<tr>

<td style="text-align: left; font-size: 11px; width: 50%;padding: 1px 10px; background-color: #fbfbfb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Have you detected a new lump in the breast or underarm?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->lumpinbreast.'"/>Unspecified lump in unspecified breast&nbsp;</span>
</td></tr></table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Have you noticed any thickening or swelling of part of your breast?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->thickeningbreast.'"/>Other signs and symptoms in breast&nbsp;</span>
</td></tr></table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any Irritation or dimpling of breast skin?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->disordersofbreast.'"/>Other specified disorders of breast&nbsp;</span>
</td></tr></table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any Redness or flaky skin in the nipple area or the breast?</span><br/>

<u style="display: none">'.$result4->rednessnipple.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>
</td></tr></table>


</td>

<td style="text-align: left; font-size: 11px; width: 50%;padding: 1px 10px; background-color: #ebebeb;">
<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any Pulling in of the nipple or pain in the nipple area?</span><br/>

<u style="display: none">'.$result4->nipplepain.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>
</td></tr></table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Nipple discharge other than breast milk, including blood?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->nippledischarge.'"/>Nipple discharge&nbsp;</span>
</td></tr></table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any change in the size or the shape of the breast?</span><br/>

<u style="display: none">'.$result4->breastsize.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>

</td></tr></table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Pain in any area of the breast?</span><br/>

<u style="display: none">'.$result4->breastpain.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>
</td></tr></table>

</td>
</tr>
</table>


<table style="width: 100%; padding: 6px 0; background-color: #fff;">

<tr>
<td>
<table style="width: 100%; padding: 0 6px; ">
 <tr>
<td style="padding: 4px 10px;  background-color: #19c6fe;">
<h1 style="font-size:14px; line-height:20px; color: #fff; padding: 0px 0; font-weight: bold; ">UTERINE (ENDOMETRIAL) CANCER SYMPTOMS</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>


<table style="width: 100%; padding:2px 0;">
<tr>
<td style="text-align: left; font-size: 11px; width: 36.6%;padding: 1px 10px; background-color: #fbfbfb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any Bleeding? <span style="font-size: 8px;">If so, where</span></span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->uterinebleeding.'"/>Abnormal uterine and vaginal bleeding, unspecified&nbsp;</span>

</td></tr></table>
</td>

<td style="text-align: left; font-size: 11px; width: 34.3%;padding: 1px 10px; background-color: #ebebeb;">
<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Sharp pains in the abdomen below the navel?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->pelvicpain.'"/> Pelvic Pain&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4-> gaspain.'"/>  Gas Pain</span>


</td></tr></table>

</td>

<td style="text-align: left; font-size: 11px; width:29%;padding: 1px 10px; background-color: #fff;">
<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Blood in urine</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->bloodinurine.'"/>Hematuria, unspecified&nbsp;</span>

</td></tr></table>

</td>




</tr>

</table> 





<table style="width: 100%; padding: 6px 0; background-color: #fff;">

<tr>
<td>
<table style="width: 100%; padding: 0 6px; ">
 <tr>
<td style="padding: 4px 10px;  background-color: #19c6fe;">
<h1 style="font-size:14px; line-height:20px; color: #fff; padding: 0px 0; font-weight: bold; ">COLORECTAL CANCER SYMPTOMS</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>



<table style="width: 100%; padding:2px 0;">
<tr>

<td style="text-align: left; font-size: 11px; width: 36.6%;padding: 1px 10px; background-color: #fbfbfb;">
<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Blood in or on your stool (bowel movement)</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->melena.'"/>Melena&nbsp;</span><br/>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Stomach pain, aches, or cramps that don’t go away?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->stomachpainabdominalpain.'"/>Unspecified abdominal pain&nbsp;</span><br/>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any changes in your bowel habits?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->bowelhabits.'"/>Change in bowel habit&nbsp;</span>
</td></tr></table>

</td>


<td style="text-align: left; font-size: 11px; width: 34.3%;padding: 1px 10px; background-color: #ebebeb;">
<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Irregular bowel movements, diarrhea or constipation?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->unconstipation.'"/>Constipation, unspecified&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->diarrhea.'"/>Diarrhea, unspecified&nbsp;</span><br/>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Multiple colon polyps?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->colonpolyps.'"/>Polyp of colon&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->inflammatorypolyps.'"/>Inflammatory Polyps
&nbsp;</span><br/>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;"> Rectal bleeding or blood in your stool? </span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->rectalbleeding.'"/>Hemorrhage of anus and rectum</span>
</td></tr></table>

</td>  

<td style="text-align: left; font-size: 11px; width: 29%;padding: 1px 10px; background-color: #fbfbfb;">


<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Abdominal bloating, cramps or discomfort?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->abdominalbloating1.'"/>Abdominal distension (gaseous)&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->abdominalbloating2.'"/>Unspecified Abdominal pain&nbsp;</span><br/>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">A feeling that your bowel doesn\'t empty completely?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->idefecation.'"/>Incomplete defecation&nbsp;</span><br/>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Stools that are thinner than normal?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->ofecalabnormalities.'"/> Other fecal abnormalities&nbsp;</span>
</td></tr></table>

</td>
</tr>

</table> 





<table style="width: 100%; padding: 6px 0; background-color: #fff;">

<tr>
<td>
<table style="width: 100%; padding: 0 6px; ">
 <tr>
<td style="padding: 4px 10px;  background-color: #19c6fe;">
<h1 style="font-size:14px; line-height:20px; color: #fff; padding: 0px 0; font-weight: bold; ">PANCREATIC CANCER SYMPTOMS</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>


<table style="width: 100%; padding:2px 0;">
<tr>
<td style="text-align: left; font-size: 11px; width: 36.6%;padding: 1px 10px; background-color: #fbfbfb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Pain in the upper abdomen which can extend to your back</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->pancreaticuabdominalpain.'"/>Upper abdominal pain, unspecified&nbsp;</span>
</td>
</tr>
</table>

 </td>

<td style="text-align: left; font-size: 11px; width: 34.3%;padding: 1px 10px; background-color: #ebebeb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Swollen gallbladder (usually found by your doctor during a physical exam)</span>&nbsp;&nbsp;<br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->cholecystitis1.'"/>Acute cholecystitis&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result4->cholecystitis2.'"/>Cholecystitis, unspecified&nbsp;</span>

</td>
</tr>
</table>
</td>

<td style="text-align: left; font-size: 11px; width: 29%;padding: 1px 10px; background-color: #fbfbfb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase; ">Have you or do you have any blood clots?</span>&nbsp;&nbsp;<br/>

<u style="display: none">'.$result4->noofbloodclots.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>
</td>
</tr>
</table>



</td>
</tr>

</table> 

 ';
$html42=' 
<div><br/><br/></div>
<div style="font-size:0px">------------MEDICATION MANAGEMENT CHECKLIST--------------</div>

<table style="width: 100%; padding: 4px 0; background-color: #1C83B4;">
  <tr>
  
   <td style="text-align: center;  vertical-align: middle;">
    
<table style="width: 100%;">
<tr>
  
<td style="text-align: center; width: 27%;">&nbsp; </td>
   
<td style="text-align: center;  background-color: #295b73 ; width:4%;"> <img src="training_page_iconpdf.png" alt="#" style="line-height: 10px; width:50px;"> </td>
     
<td style="text-align: center; vertical-align: middle; background-color: #295b73 ; width:42%;    font-size:14px!important;
    color: #fefefe;text-transform: uppercase;"><h1 style="font-size:14px; line-height:34px;">MEDICATION MANAGEMENT CHECKLIST</h1></td>
  <td style="text-align: center; width: 27%;">&nbsp; </td>
  </tr>

</table>


 </td>
  </tr>
 </table>
 
 
<table style="width: 100%; padding: 6px 0; background-color: #fff;">

<tr>
<td>
<table style="width: 100%; padding: 0 6px; ">
 <tr>
<td style="padding: 4px 10px;  background-color: #19c6fe;">
<h1 style="font-size:16px; line-height:34px; color: #fff; padding: 0px 0; font-weight: bold; ">PSYCH</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>


<table style="width: 100%; ">
 <tr>
<td style="background-color: #fbfbfb; padding: 4px 10px; width: 40%; ">
<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">BIPOLAR</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 50%; ">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->lithium.'"/>&nbsp;Lithium&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->seroquel.'"/>&nbsp;Seroquel&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->latuda.'"/>&nbsp;Latuda&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->ativan.'"/>&nbsp;Ativan&nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 50%; ">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->abilify.'"/>&nbsp;Abilify&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->clonazepam.'"/>&nbsp;Clonazepam&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->valium.'"/>&nbsp;Valium&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->zyprexa.'"/>&nbsp;Zyprexa&nbsp;&nbsp;</span><br/>
</td>
</tr>
</table>

</td>
<td style="background-color: #ebebeb; padding: 4px 10px; width: 60%; ">
<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">DEPRESSION</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 38%; ">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->xanax.'"/>&nbsp;Xanax / Alprazolam&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->zoloft.'"/>&nbsp;Zoloft / Certriline&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->celexa.'"/>&nbsp;Celexa / Citalopram&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->cymbalta.'"/>&nbsp;Cymbalta / Duloxetine&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->klonopin.'"/>&nbsp;Klonopin / Clonazepam&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->waellbutrin.'"/>&nbsp;Wellbutrin / Buproprion&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->prozac.'"/>&nbsp;Prozac / Fluoxetine&nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 37%; ">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->lexapro.'"/>&nbsp;Lexapro / Escitalopram&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->viibryd.'"/>&nbsp;Viibryd&nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 25%; ">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->amitriptyline.'"/>&nbsp;Amitriptyline&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->trazodone.'"/>&nbsp;Trazodone&nbsp;&nbsp;</span><br/>
</td>
</tr>
</table>

</td>
</tr>
</table>

<table style="width: 100%; padding: 6px 0; background-color: #fff;">

<tr>
<td>
<table style="width: 100%; padding: 0 6px; ">
 <tr>
<td style="padding: 4px 10px;  background-color: #19c6fe;">
<h1 style="font-size:16px; line-height:34px; color: #fff; padding: 0px 0; font-weight: bold; ">CARDIAC</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>

<table style="width: 100%; ">
 <tr>
<td style="background-color: #fbfbfb; padding: 4px 10px; width: 30%; ">
<span style="font-size:15px; line-height:18px; color: #304554; padding: 0px 10px; font-weight: bold; ">ANGINA</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 100%; ">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->nitros.'" />&nbsp;NITROs&nbsp;&nbsp;</span><br/><br/>

<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">HEART ATTACK</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->heartattack.'"/>&nbsp;Just take patients statement that they had a heart attack/myocardial infarction&nbsp;&nbsp;</span><br/>

</td>

</tr>
</table>

</td>
<td style="background-color: #ebebeb; padding: 4px 10px; width: 42%; ">

<span style="font-size:15px; line-height:18px; color: #304554; padding: 0px 10px; font-weight: bold; ">ATHEROSCLEROSIS<br/><span style="display: block; font-size: 11px; font-weight: normal;">(High Cholesterol)
</span>
</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 47%; ">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->lipitor.'"/>&nbsp;Lipitor / Atorvastatin&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->zocor.'"/>&nbsp;Zocor / Simvastatin&nbsp;&nbsp;</span><br/>

</td>

<td style=" padding: 4px 10px; width: 53%; ">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->crestor.'"/>&nbsp;Crestor / Rosuvastatin&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->mevacor.'"/>&nbsp;Mevacor / Lovastatin&nbsp;&nbsp;</span><br/>
</td>

</tr>
</table>


</td>
<td style="background-color: #fbfbfb; padding: 4px 10px; width: 28%; ">

<span style="font-size:15px; line-height:18px; color: #304554; padding: 0px 10px; font-weight: bold; ">IRRITANT CONTACT DERMATITIS<br/><span style="display: block; font-size: 11px; font-weight: normal;">(Skin Rash)</span></span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 100%; ">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->skinrash.'"/>&nbsp;Just take patients statement that they had a skin rash at same point&nbsp;&nbsp;</span><br/>

</td>

</tr>
</table>

</td>

</tr>
</table>

<table style="width: 100%; padding: 6px 0; background-color: #fff;">

<tr>
<td>
<table style="width: 100%; padding: 0 6px; ">
 <tr>
<td style="padding: 4px 10px;  background-color: #19c6fe;">
<h1 style="font-size:16px; line-height:34px; color: #fff; padding: 0px 0; font-weight: bold; ">MISCELLANEOUS COMMON DRUG/DISEASE STATES</h1>
</td>
</tr>
</table>
</td>
</tr>
</table>


<table style="width: 100%; ">
<tr>

<td style="background-color: #fbfbfb; padding: 4px 10px; width: 43%; ">
<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">ACID REFLUX</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 55%;">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->prilosec.'"/>&nbsp;Prilosec / Omeprazole&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->nexium.'"/>&nbsp;Nexium / Esomeprazole&nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 45%;">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->zantac.'"/>&nbsp;Zantac / Ranitidine&nbsp;&nbsp;</span><br/>
</td>
</tr>
</table>

</td>

<td style="background-color: #ebebeb; padding: 4px 10px; width: 25%; ">
<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">FIBROMYALGIA	</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 100%;">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->neurontin.'"/>&nbsp;Neurontin / Gabapentin &nbsp;&nbsp;</span><br/>

</td>

</tr>
</table>

</td>

<td style="background-color: #fbfbfb; padding: 4px 10px; width: 32%; ">

<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">DERMATITIS</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 50%;">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->triamcinolone.'"/>&nbsp;Triamcinolone &nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->fluocinonide.'"/>&nbsp;Fluocinonide &nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 50%;">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->clobex.'"/>&nbsp;Clobex &nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result5->betamethasone.'"/>&nbsp;Betamethasone &nbsp;&nbsp;</span><br/>
</td>
</tr>
</table>

</td>

</tr>
</table>


';

/*$html3 ='






';*/

// output the HTML content
$pdf->SetY(2);
//$pdf->SetX(0);
//$pdf->writeHTML($html.$html2.$html3, true, 0, true, true);
//$pdf->writeHTML($html, true, false, true, false, '');



//$pdf->SetFont('helvetica');
$pdf->writeHTML($html, true, false, true, false, '');

/*$pdf->SetLeftMargin(8);*/
$pdf->SetFont('helvetica');
if($result->insurance1 == 'checked') {
    $pdf->writeHTML($html1, true, false, true, false, '');
}

/*$pdf->SetLeftMargin(8);*/
$pdf->SetFont('helvetica');
if($result->insurance2 == 'checked') {
    $pdf->writeHTML($html2, true, false, true, false, '');
}
if($result->insurance3 == 'checked') {
    $pdf->writeHTML($html3, true, false, true, false, '');
}
if($result->insurance4=='1') {
    $pdf->writeHTML($html4, true, false, true, false, '');
}
if($result->insurance1_1=='checked' || $result->insurance2_1=='checked' || $result->insurance3_1=='checked' || $result->insurance4_1=='checked') {
    $pdf->writeHTML($html5, true, false, true, false, '');
    if($result->insurance1_1=='checked') {
        $pdf->writeHTML($html6, true, false, true, false, '');
    }
    if($result->insurance2_1=='checked') {
        $pdf->writeHTML($html7, true, false, true, false, '');
    }
    if($result->insurance3_1=='checked') {
        $pdf->writeHTML($html8, true, false, true, false, '');
    }
    if($result->insurance4_1=='checked') {
        $pdf->writeHTML($html9, true, false, true, false, '');
    }
}
if($result->insurance1_2=='checked' || $result->insurance2_2=='checked' || $result->insurance3_2=='checked' || $result->insurance4_2=='checked') {
    $pdf->writeHTML($html10, true, false, true, false, '');
    if($result->insurance1_2=='checked') {
        $pdf->writeHTML($html11, true, false, true, false, '');
    }
    if($result->insurance2_2=='checked') {
        $pdf->writeHTML($html12, true, false, true, false, '');
    }
    if($result->insurance3_2=='checked') {
        $pdf->writeHTML($html13, true, false, true, false, '');
    }
    if($result->insurance4_2=='checked') {
        $pdf->writeHTML($html14, true, false, true, false, '');
    }
}
if($result->insurance1_3=='checked' || $result->insurance2_3=='checked' || $result->insurance3_3=='checked' || $result->insurance4_3=='checked') {
    $pdf->writeHTML($html15, true, false, true, false, '');
    if($result->insurance1_3=='checked') {
        $pdf->writeHTML($html16, true, false, true, false, '');
    }
    if($result->insurance2_3=='checked') {
        $pdf->writeHTML($html17, true, false, true, false, '');
    }
    if($result->insurance3_3=='checked') {
        $pdf->writeHTML($html18, true, false, true, false, '');
    }
    if($result->insurance4_3=='checked') {
        $pdf->writeHTML($html19, true, false, true, false, '');
    }
}


if($result->insurance1_4=='checked' || $result->insurance2_4=='checked' || $result->insurance3_4=='checked' || $result->insurance4_4=='checked') {
    //  $pdf->SetY(275);
    //  $pdf->writeHTML($html41, true, false, true, false, '');
    if($result->insurance1_4=='checked') {
        $pdf->writeHTML($html53, true, false, true, false, '');
    }
    if($result->insurance2_4=='checked') {
        //  $pdf->SetY(255);
        //  $pdf->writeHTML($html42, true, false, true, false, '');
    }
    if($result->insurance3_4=='checked') {
        $pdf->writeHTML($html43, true, false, true, false, '');
    }
    if($result->insurance4_4=='checked') {
        $pdf->writeHTML($html44, true, false, true, false, '');
    }
}

if($result->insurance1_5=='checked' || $result->insurance2_5=='checked' || $result->insurance3_5=='checked' || $result->insurance4_5=='checked') {
    $pdf->writeHTML($html45, true, false, true, false, '');
    if($result->insurance1_5=='checked') {
        $pdf->writeHTML($html54, true, false, true, false, '');
    }
    if($result->insurance2_5=='checked') {
        $pdf->writeHTML($html46, true, false, true, false, '');
    }
    if($result->insurance3_5=='checked') {
        $pdf->writeHTML($html47, true, false, true, false, '');
    }
    if($result->insurance4_5=='checked') {
        $pdf->writeHTML($html48, true, false, true, false, '');
    }
}
if($result->insurance1_6=='checked' || $result->insurance2_6=='checked' || $result->insurance3_6=='checked' || $result->insurance4_6=='checked') {
    $pdf->writeHTML($html49, true, false, true, false, '');
    if($result->insurance1_6=='checked') {
        $pdf->writeHTML($html55, true, false, true, false, '');
    }
    if($result->insurance2_6=='checked') {
        $pdf->writeHTML($html50, true, false, true, false, '');
    }
    if($result->insurance3_6=='checked') {
        $pdf->writeHTML($html51, true, false, true, false, '');
    }
    if($result->insurance4_6=='checked') {
        $pdf->writeHTML($html52, true, false, true, false, '');
    }
}

$pdf->writeHTML($html20, true, false, true, false, '');
//if($result->cancer_sup=='Yes') {
$pdf->writeHTML($html21, true, false, true, false, '');
if($result->familyrelation0!=null && $result->familyrelation0!='') {
    $pdf->writeHTML($html22, true, false, true, false, '');
}
if($result->familyrelation1!=null && $result->familyrelation1!='') {
    $pdf->writeHTML($html23, true, false, true, false, '');
}
if($result->familyrelation2!=null && $result->familyrelation2!='') {
    $pdf->writeHTML($html24, true, false, true, false, '');
}
if($result->familyrelation3!=null && $result->familyrelation3!='') {
    $pdf->writeHTML($html25, true, false, true, false, '');
}
if($result->familyrelation4!=null && $result->familyrelation4!='') {
    $pdf->writeHTML($html26, true, false, true, false, '');
}
if($result->familyrelation5!=null && $result->familyrelation5!='') {
    $pdf->writeHTML($html27, true, false, true, false, '');
}
if($result->familyrelation6!=null && $result->familyrelation6!='') {
    $pdf->writeHTML($html28, true, false, true, false, '');
}
if($result->familyrelation7!=null && $result->familyrelation7!='') {
    $pdf->writeHTML($html29, true, false, true, false, '');
}
if($result->familyrelation8!=null && $result->familyrelation8!='') {
    $pdf->writeHTML($html30, true, false, true, false, '');
}
if($result->familyrelation9!=null && $result->familyrelation9!='') {
    $pdf->writeHTML($html31, true, false, true, false, '');
}
if($result->familyrelation10!=null && $result->familyrelation10!='') {
    $pdf->writeHTML($html32, true, false, true, false, '');
}
if($result->familyrelation11!=null && $result->familyrelation11!='') {
    $pdf->writeHTML($html33, true, false, true, false, '');
}
if($result->familyrelation12!=null && $result->familyrelation12!='') {
    $pdf->writeHTML($html34, true, false, true, false, '');
}
if($result->familyrelation13!=null && $result->familyrelation13!='') {
    $pdf->writeHTML($html35, true, false, true, false, '');
}
if($result->familyrelation14!=null && $result->familyrelation14!='') {
    $pdf->writeHTML($html36, true, false, true, false, '');
}
if($result->familyrelation15!=null && $result->familyrelation15!='') {
    $pdf->writeHTML($html37, true, false, true, false, '');
}
if($result->familyrelation16!=null && $result->familyrelation16!='') {
    $pdf->writeHTML($html38, true, false, true, false, '');
}
if($result->familyrelation17!=null && $result->familyrelation17!='') {
    $pdf->writeHTML($html39, true, false, true, false, '');
}
//}
$pdf->writeHTML($html40, true, false, true, false, '');

$pdf->SetY(275);
$pdf->writeHTML($html41, true, false, true, false, '');


$pdf->SetY(255);

$pdf->writeHTML($html42, true, false, true, false, '');






/*$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '', 30);

$pdf->SetFont($fontname, '', 25, '', false);
$pdf->writeHTML($html2, true, 0, true, true);

//$pdf->SetFont('helvetica');
$pdf->writeHTML($html3, true, false, true, false, '');*/

// reset pointer to the last page
$pdf->lastPage();

//print_r($result);
// ---------------------------------------------------------
$filename= $result->firstname . $result->lastname . '_' .$result1uniqueid.'.pdf';
//echo $filename;
//Close and output PDF document
$pdf->Output($filename, 'I');

//============================================================+
// END OF FILE
//============================================================+


/*--------------------------------------------555----------------------------------------------*/
