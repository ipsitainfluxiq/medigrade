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

// Include the main TCPDF library (search for installation path).
require_once('tcpdf/examples/tcpdf_include.php');
//require_once('tcpdf_include.php');
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
  CURLOPT_URL => "http://greenvalleyportal.com:3020/getcommoncancersymptomsforpdf?id=".$id,
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
$result=json_decode($response);
$result = $result->item;
/*echo "<pre>";
print_r($result);
echo "</pre>";*/
if($result->weightloss==1){
  $result->weightloss = 'checked';
}
else{
  $result->weightloss = 'false';
}
if($result->appetite==1){
  $result->appetite = 'checked';
}
else{
  $result->appetite = 'false';
}
if($result->eatingdisorder==1){
  $result->eatingdisorder = 'checked';
}
else{
  $result->eatingdisorder = 'false';
}
if($result->unabdominalpain==1){
  $result->unabdominalpain = 'checked';
}
else{
  $result->unabdominalpain = 'false';
}
if($result->upabdominalpain==1){
  $result->upabdominalpain = 'checked';
}
else{
  $result->upabdominalpain = 'false';
}
if($result->ruquadrantpain==1){
  $result->ruquadrantpain = 'checked';
}
else{
  $result->ruquadrantpain = 'false';
}
if($result->luquadrantpain==1){
  $result->luquadrantpain = 'checked';
}
else{
  $result->luquadrantpain = 'false';
}
if($result->labdominalpain==1){
  $result->labdominalpain = 'checked';
}
else{
  $result->labdominalpain = 'false';
}
if($result->rlquadrantpain==1){
  $result->rlquadrantpain = 'checked';
}
else{
  $result->rlquadrantpain = 'false';
}
if($result->llquadrantpain==1){
  $result->llquadrantpain = 'checked';
}
else{
  $result->llquadrantpain = 'false';
}
if($result->gabdominalpain==1){
  $result->gabdominalpain = 'checked';
}
else{
  $result->gabdominalpain = 'false';
}
if($result->vomiting1==1){
  $result->vomiting1 = 'checked';
}
else{
  $result->vomiting1 = 'false';
}
if($result->vomiting2==1){
  $result->vomiting2 = 'checked';
}
else{
  $result->vomiting2 = 'false';
}
if($result->vomiting3==1){
  $result->vomiting3 = 'checked';
}
else{
  $result->vomiting3 = 'false';
}
if($result->chronicfatigue==1){
  $result->chronicfatigue = 'checked';
}
else{
  $result->chronicfatigue = 'false';
}
if($result->otherfatigue==1){
  $result->otherfatigue = 'checked';
}
else{
  $result->otherfatigue = 'false';
}
if($result->anemia==1){
  $result->anemia = 'checked';
}
else{
  $result->anemia = 'false';
}
if($result->jaundice==1){
  $result->jaundice = 'checked';
}
else{
  $result->jaundice = 'false';
}
if($result->fatigue1==1){
  $result->fatigue1 = 'checked';
}
else{
  $result->fatigue1 = 'false';
}
if($result->fatigue2==1){
  $result->fatigue2 = 'checked';
}
else{
  $result->fatigue2 = 'false';
}
if($result->type1diabetes==1){
  $result->type1diabetes = 'checked';
}
else{
  $result->type1diabetes = 'false';
}
if($result->type2diabetes==1){
  $result->type2diabetes = 'checked';
}
else{
  $result->type2diabetes = 'false';
}
if($result->constipation==1){
  $result->constipation = 'checked';
}
else{
  $result->constipation = 'false';
}
if($result->abnormalweightloss==1){
  $result->abnormalweightloss = 'checked';
}
else{
  $result->abnormalweightloss = 'false';
}
if($result->abnormalweightgain==1){
  $result->abnormalweightgain = 'checked';
}
else{
  $result->abnormalweightgain = 'false';
}
if($result->hypertrophicdisorders==1){
  $result->hypertrophicdisorders = 'checked';
}
else{
  $result->hypertrophicdisorders = 'false';
}
if($result->bloodinstool==1){
  $result->bloodinstool = 'checked';
}
else{
  $result->bloodinstool = 'false';
}
if($result->skineruption==1){
  $result->skineruption = 'checked';
}
else{
  $result->skineruption = 'false';
}
if($result->xerosiscutis==1){
  $result->xerosiscutis = 'checked';
}
else{
  $result->xerosiscutis = 'false';
}

if($result->lumpinbreast==1){
  $result->lumpinbreast = 'checked';
}
else{
  $result->lumpinbreast = 'false';
}

if($result->thickeningbreast==1){
  $result->thickeningbreast = 'checked';
}
else{
  $result->thickeningbreast = 'false';
}

if($result->disordersofbreast==1){
  $result->disordersofbreast = 'checked';
}
else{
  $result->disordersofbreast = 'false';
}

if($result->nipplepain==1){
    $result->nipplepain = 'checked';
}
else{
    $result->nipplepain = 'false';
}

if($result->rednessnipple==1){
    $result->rednessnipple = 'checked';
}
else{
    $result->rednessnipple = 'false';
}


if($result->breastsize==1){
    $result->breastsize = 'checked';
}
else{
    $result->breastsize = 'false';
}


if($result->breastpain==1){
    $result->breastpain = 'checked';
}
else{
    $result->breastpain = 'false';
}

if($result->noofbloodclots==1){
    $result->noofbloodclots = 'checked';
}
else{
    $result->noofbloodclots = 'false';
}

if($result->nippledischarge==1){
  $result->nippledischarge = 'checked';
}
else{
  $result->nippledischarge = 'false';
}

if($result->uterinebleeding==1){
  $result->uterinebleeding = 'checked';
}
else{
  $result->uterinebleeding = 'false';
}

if($result->bloodinurine==1){
  $result->bloodinurine = 'checked';
}
else{
  $result->bloodinurine = 'false';
}
if($result->melena==1){
  $result->melena = 'checked';
}
else{
  $result->melena = 'false';
}
if($result->stomachpainabdominalpain==1){
  $result->stomachpainabdominalpain = 'checked';
}
else{
  $result->stomachpainabdominalpain = 'false';
}
if($result->bowelhabits==1){
  $result->bowelhabits = 'checked';
}
else{
  $result->bowelhabits = 'false';
}
if($result->unconstipation==1){
  $result->unconstipation = 'checked';
}
else{
  $result->unconstipation = 'false';
}
if($result->diarrhea==1){
  $result->diarrhea = 'checked';
}
else{
  $result->diarrhea = 'false';
}
if($result->colonpolyps==1){
  $result->colonpolyps = 'checked';
}
else{
  $result->colonpolyps = 'false';
}
if($result->rectalbleeding==1){
  $result->rectalbleeding = 'checked';
}
else{
  $result->rectalbleeding = 'false';
}
if($result->abdominalbloating1==1){
  $result->abdominalbloating1 = 'checked';
}
else{
  $result->abdominalbloating1 = 'false';
}
if($result->abdominalbloating2==1){
  $result->abdominalbloating2 = 'checked';
}
else{
  $result->abdominalbloating2 = 'false';
}
if($result->idefecation==1){
  $result->idefecation = 'checked';
}
else{
  $result->idefecation = 'false';
}
if($result->ofecalabnormalities==1){
  $result->ofecalabnormalities = 'checked';
}
else{
  $result->ofecalabnormalities = 'false';
}
if($result->pancreaticuabdominalpain==1){
  $result->pancreaticuabdominalpain = 'checked';
}
else{
  $result->pancreaticuabdominalpain = 'false';
}
if($result->cholecystitis1==1){
  $result->cholecystitis1 = 'checked';
}
else{
  $result->cholecystitis1 = 'false';
}
if($result->cholecystitis2==1){
  $result->cholecystitis2 = 'checked';
}
else{
  $result->cholecystitis2 = 'false';
}

$html = ' 
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

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Have you experienced unexplained weight loss?</span><br/><span style="padding: 0; color: #333;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->weightloss.'"/>Abnormal weight loss&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any unexplained loss of appetite?</span><br/>
<span style="padding: 0; color: #333;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->appetite.'"/>Anorexia&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->eatingdisorder.'"/>Other specified eating disorder&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Abdominal pain?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->unabdominalpain.'"/>Unspecified abdominal pain&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->upabdominalpain.'"/>Upper abdominal pain, unspecified&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->ruquadrantpain.'"/>Right upper quadrant pain&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->luquadrantpain.'"/>Left upper quadrant pain&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->labdominalpain.'"/>Lower abdominal pain, unspecified&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->rlquadrantpain.'"/>Right lower quadrant pain&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->llquadrantpain.'"/>Left lower quadrant pain&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->gabdominalpain.'"/>Generalized abdominal pain&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Nausea or vomiting?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->vomiting1.'"/>Nausea&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->vomiting2.'"/>Vomiting&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->vomiting3.'"/>Nausea with vomiting, unspecified&nbsp;&nbsp;</span>
</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any weakness or fatigue?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->chronicfatigue.'"/>Chronic fatigue, unspecified&nbsp;&nbsp;</span>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->otherfatigue.'"/>Other fatigue&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Have you experienced any anemia?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->anemia.'"/>&nbsp;Multiple: Anemia, unspecified&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Do you have signs of Jaundice?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->jaundice.'"/>Unspecified jaundice&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

</td>

<td style="text-align: left; font-size: 11px; width: 50%;padding: 1px 10px; background-color: #ebebeb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Feeling very tired all the time?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->fatigue1.'"/>Chronic fatigue, unspecified&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->fatigue2.'"/>Other fatigue&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Do you have Diabetes?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->type1diabetes.'"/>Type 1 diabetes mellitus&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->type2diabetes.'"/>Type 2 diabetes mellitus&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Constipation?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->constipation.'"/>Constipation, unspecified&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Abnormal weight loss?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->abnormalweightloss.'"/>Abnormal weight loss&nbsp;&nbsp;</span>

</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Abnormal weight gain?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->abnormalweightgain.'"/>Abnormal weight gain&nbsp;&nbsp;</span>
</td>

</tr>
 
</table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Skin tags?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->hypertrophicdisorders.'"/>Other hypertrophic disorders of the skin&nbsp;&nbsp;</span>
</td>

</tr>
 
</table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Blood in stool?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->bloodinstool.'"/>Occult blood in feces&nbsp;&nbsp;</span>
</td>

</tr>
 
</table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td style="text-align: left; font-size: 11px; ">
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Dry Skin?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->skineruption.'"/>Rash and other nonspecific skin eruption&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->xerosiscutis.'"/>Xerosis cutis&nbsp;&nbsp;</span>

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
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->lumpinbreast.'"/>Unspecified lump in unspecified breast&nbsp;</span>
</td></tr></table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Have you noticed any thickening or swelling of part of your breast?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->thickeningbreast.'"/>Other signs and symptoms in breast&nbsp;</span>
</td></tr></table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any Irritation or dimpling of breast skin?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->disordersofbreast.'"/>Other specified disorders of breast&nbsp;</span>
</td></tr></table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any Redness or flaky skin in the nipple area or the breast?</span><br/>

<u style="display: none">'.$result->rednessnipple.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>
</td></tr></table>


</td>

<td style="text-align: left; font-size: 11px; width: 50%;padding: 1px 10px; background-color: #ebebeb;">
<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any Pulling in of the nipple or pain in the nipple area?</span><br/>

<u style="display: none">'.$result->nipplepain.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>
</td></tr></table>



<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Nipple discharge other than breast milk, including blood?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->nippledischarge.'"/>Nipple discharge&nbsp;</span>
</td></tr></table>

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any change in the size or the shape of the breast?</span><br/>

<u style="display: none">'.$result->breastsize.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>

</td></tr></table>


<table style="width: 100%; padding:1px 5px;">
<tr>
<td>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Pain in any area of the breast?</span><br/>

<u style="display: none">'.$result->breastpain.'</u>
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
<td style="text-align: left; font-size: 11px; width: 50%;padding: 1px 10px; background-color: #fbfbfb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any Bleeding? <span style="font-size: 8px;">If so, where</span></span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->uterinebleeding.'"/>Abnormal uterine and vaginal bleeding, unspecified&nbsp;</span>

</td></tr></table>
</td>


<td style="text-align: left; font-size: 11px; width: 50%;padding: 1px 10px; background-color: #ebebeb;">
<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Blood in urine</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->bloodinurine.'"/>Hematuria, unspecified&nbsp;</span>

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

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Blood in or on your stool (bowel movement)</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->melena.'"/>Melena&nbsp;</span><br/>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Stomach pain, aches, or cramps that don’t go away?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->stomachpainabdominalpain.'"/>Unspecified abdominal pain&nbsp;</span><br/>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Any changes in your bowel habits?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->bowelhabits.'"/>Change in bowel habit&nbsp;</span>
</td></tr></table>

</td>


<td style="text-align: left; font-size: 11px; width: 34.3%;padding: 1px 10px; background-color: #ebebeb;">
<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Irregular bowel movements, diarrhea or constipation?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->unconstipation.'"/>Constipation, unspecified&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->diarrhea.'"/>Diarrhea, unspecified&nbsp;</span><br/>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Multiple colon polyps?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->colonpolyps.'"/>Polyp of colon&nbsp;</span><br/>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Rectal bleeding or blood in your stool?</span><br/><span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->rectalbleeding.'"/>Hemorrhage of anus and rectum</span>
</td></tr></table>

</td>

<td style="text-align: left; font-size: 11px; width: 29%;padding: 1px 10px; background-color: #fbfbfb;">


<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Abdominal bloating, cramps or discomfort?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->abdominalbloating1.'"/>Abdominal distension (gaseous)&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->abdominalbloating2.'"/>Unspecified abdominal pain&nbsp;</span><br/>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">A feeling that your bowel doesn\'t empty completely?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->idefecation.'"/>Incomplete defecation&nbsp;</span><br/>
<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Stools that are thinner than normal?</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->ofecalabnormalities.'"/> Other fecal abnormalities&nbsp;</span>
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
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->pancreaticuabdominalpain.'"/>Upper abdominal pain, unspecified&nbsp;</span>
</td>
</tr>
</table>

 </td>

<td style="text-align: left; font-size: 11px; width: 34.3%;padding: 1px 10px; background-color: #ebebeb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase;">Swollen gallbladder (usually found by your doctor during a physical exam)</span>&nbsp;&nbsp;<br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->cholecystitis1.'"/>Acute cholecystitis&nbsp;</span><br/>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->cholecystitis2.'"/>Cholecystitis, unspecified&nbsp;</span>

</td>
</tr>
</table>
</td>

<td style="text-align: left; font-size: 11px; width: 29%;padding: 1px 10px; background-color: #fbfbfb;">

<table style="width: 100%; padding:1px 5px;">
<tr>
<td>

<span style="font-size:10px; line-height:11px; color: #304554; padding: 0px 10px; font-weight: bold; text-transform: uppercase; ">Have you or do you have any blood clots?</span>&nbsp;&nbsp;<br/>

<u style="display: none">'.$result->noofbloodclots.'</u>
<span style="padding: 0; color: #333;  "><input type="checkbox" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;</span>
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


/*$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '', 30);

$pdf->SetFont($fontname, '', 25, '', false);
$pdf->writeHTML($html2, true, 0, true, true);

//$pdf->SetFont('helvetica');
$pdf->writeHTML($html3, true, false, true, false, '');*/

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('common_cancer_symptoms.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
