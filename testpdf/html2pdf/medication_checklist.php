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
    CURLOPT_URL => "http://greenvalleyportal.com:3020/getmedicationpgxforpdf?id=".$id,
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
echo "</pre>";
exit;*/
if($result->lithium==1){
    $result->lithium = 'checked';
}
else{
    $result->lithium = 'false';
}
if($result->abilify==1){
    $result->abilify = 'checked';
}
else{
    $result->abilify = 'false';
}
if($result->seroquel==1){
    $result->seroquel = 'checked';
}
else{
    $result->seroquel = 'false';
}
if($result->clonazepam==1){
    $result->clonazepam = 'checked';
}
else{
    $result->clonazepam = 'false';
}
if($result->latuda==1){
    $result->latuda = 'checked';
}
else{
    $result->latuda = 'false';
}
if($result->valium==1){
    $result->valium = 'checked';
}
else{
    $result->valium = 'false';
}
if($result->ativan==1){
    $result->ativan = 'checked';
}
else{
    $result->ativan = 'false';
}
if($result->zyprexa==1){
    $result->zyprexa = 'checked';
}
else{
    $result->zyprexa = 'false';
}
if($result->xanax==1){
    $result->xanax = 'checked';
}
else{
    $result->xanax = 'false';
}
if($result->zoloft==1){
    $result->zoloft = 'checked';
}
else{
    $result->zoloft = 'false';
}
if($result->celexa==1){
    $result->celexa = 'checked';
}
else{
    $result->celexa = 'false';
}
if($result->paxil==1){
    $result->paxil = 'checked';
}
else{
    $result->paxil = 'false';
}
if($result->cymbalta==1){
    $result->cymbalta = 'checked';
}
else{
    $result->cymbalta = 'false';
}
if($result->klonopin==1){
    $result->klonopin = 'checked';
}
else{
    $result->klonopin = 'false';
}
if($result->waellbutrin==1){
    $result->waellbutrin = 'checked';
}
else{
    $result->waellbutrin = 'false';
}
if($result->prozac==1){
    $result->prozac = 'checked';
}
else{
    $result->prozac = 'false';
}
if($result->lexapro==1){
    $result->lexapro = 'checked';
}
else{
    $result->lexapro = 'false';
}
if($result->amitriptyline==1){
    $result->amitriptyline = 'checked';
}
else{
    $result->amitriptyline = 'false';
}
if($result->viibryd==1){
    $result->viibryd = 'checked';
}
else{
    $result->viibryd = 'false';
}
if($result->trazodone==1){
    $result->trazodone = 'checked';
}
else{
    $result->trazodone = 'false';
}
if($result->nitros==1){
    $result->nitros = 'checked';
}
else{
    $result->nitros = 'false';
}
if($result->heartattack==1){
    $result->heartattack = 'checked';
}
else{
    $result->heartattack = 'false';
}
if($result->lipitor==1){
    $result->lipitor = 'checked';
}
else{
    $result->lipitor = 'false';
}
if($result->crestor==1){
    $result->crestor = 'checked';
}
else{
    $result->crestor = 'false';
}
if($result->zocor==1){
    $result->zocor = 'checked';
}
else{
    $result->zocor = 'false';
}
if($result->mevacor==1){
    $result->mevacor = 'checked';
}
else{
    $result->mevacor = 'false';
}
if($result->skinrash==1){
    $result->skinrash = 'checked';
}
else{
    $result->skinrash = 'false';
}
if($result->prilosec==1){
    $result->prilosec = 'checked';
}
else{
    $result->prilosec = 'false';
}
if($result->zantac==1){
    $result->zantac = 'checked';
}
else{
    $result->zantac = 'false';
}

if($result->nexium==1){
    $result->nexium = 'checked';
}
else{
    $result->nexium = 'false';
}

if($result->neurontin==1){
    $result->neurontin = 'checked';
}
else{
    $result->neurontin = 'false';
}

if($result->triamcinolone==1){
    $result->triamcinolone = 'checked';
}
else{
    $result->triamcinolone = 'false';
}

if($result->clobex==1){
    $result->clobex = 'checked';
}
else{
    $result->clobex = 'false';
}

if($result->fluocinonide==1){
    $result->fluocinonide = 'checked';
}
else{
    $result->fluocinonide = 'false';
}

if($result->betamethasone==1){
    $result->betamethasone = 'checked';
}
else{
    $result->betamethasone = 'false';
}

$html = ' 
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

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->lithium.'"/>&nbsp;Lithium&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->seroquel.'"/>&nbsp;Seroquel&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->latuda.'"/>&nbsp;Latuda&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->ativan.'"/>&nbsp;Ativan&nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 50%; ">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->abilify.'"/>&nbsp;Abilify&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->clonazepam.'"/>&nbsp;Clonazepam&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->valium.'"/>&nbsp;Valium&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->zyprexa.'"/>&nbsp;Zyprexa&nbsp;&nbsp;</span><br/>
</td>
</tr>
</table>

</td>
<td style="background-color: #ebebeb; padding: 4px 10px; width: 60%; ">
<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">DEPRESSION</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 38%; ">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->xanax.'"/>&nbsp;Xanax / Alprazolam&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->zoloft.'"/>&nbsp;Zoloft / Certriline&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->celexa.'"/>&nbsp;Celexa / Citalopram&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->cymbalta.'"/>&nbsp;Cymbalta / Duloxetine&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->klonopin.'"/>&nbsp;Klonopin / Clonazepam&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->waellbutrin.'"/>&nbsp;Wellbutrin / Buproprion&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->prozac.'"/>&nbsp;Prozac / Fluoxetine&nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 37%; ">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->lexapro.'"/>&nbsp;Lexapro / Escitalopram&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->viibryd.'"/>&nbsp;Viibryd&nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 25%; ">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->amitriptyline.'"/>&nbsp;Amitriptyline&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->trazodone.'"/>&nbsp;Trazodone&nbsp;&nbsp;</span><br/>
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

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->nitros.'" />&nbsp;NITROs&nbsp;&nbsp;</span><br/><br/>

<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">HEART ATTACK</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->heartattack.'"/>&nbsp;Just take patients statement that they had a heart attack/myocardial infarction&nbsp;&nbsp;</span><br/>

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

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->lipitor.'"/>&nbsp;Lipitor / Atorvastatin&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->zocor.'"/>&nbsp;Zocor / Simvastatin&nbsp;&nbsp;</span><br/>

</td>

<td style=" padding: 4px 10px; width: 53%; ">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->crestor.'"/>&nbsp;Crestor / Rosuvastatin&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->mevacor.'"/>&nbsp;Mevacor / Lovastatin&nbsp;&nbsp;</span><br/>
</td>

</tr>
</table>


</td>
<td style="background-color: #fbfbfb; padding: 4px 10px; width: 28%; ">

<span style="font-size:15px; line-height:18px; color: #304554; padding: 0px 10px; font-weight: bold; ">IRRITANT CONTACT DERMATITIS<br/><span style="display: block; font-size: 11px; font-weight: normal;">(Skin Rash)</span></span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 100%; ">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->skinrash.'"/>&nbsp;Just take patients statement that they had a skin rash at same point&nbsp;&nbsp;</span><br/>

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

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->prilosec.'"/>&nbsp;Prilosec / Omeprazole&nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->nexium.'"/>&nbsp;Nexium / Esomeprazole&nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 45%;">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->zantac.'"/>&nbsp;Zantac / Ranitidine&nbsp;&nbsp;</span><br/>
</td>
</tr>
</table>

</td>

<td style="background-color: #ebebeb; padding: 4px 10px; width: 25%; ">
<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">FIBROMYALGIA	</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 100%;">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->neurontin.'"/>&nbsp;Neurontin / Gabapentin &nbsp;&nbsp;</span><br/>

</td>

</tr>
</table>

</td>

<td style="background-color: #fbfbfb; padding: 4px 10px; width: 32%; ">

<span style="font-size:15px; line-height:34px; color: #304554; padding: 0px 10px; font-weight: bold; ">DERMATITIS</span><br/>
<table style="width: 100%; ">
 <tr>
<td style=" padding: 4px 10px; width: 50%;">

<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->triamcinolone.'"/>&nbsp;Triamcinolone &nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->fluocinonide.'"/>&nbsp;Fluocinonide &nbsp;&nbsp;</span><br/>
</td>
<td style=" padding: 4px 10px; width: 50%;">
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->clobex.'"/>&nbsp;Clobex &nbsp;&nbsp;</span><br/>
<span style="padding: 0; color: #333; font-size: 12px;"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->betamethasone.'"/>&nbsp;Betamethasone &nbsp;&nbsp;</span><br/>
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
$pdf->Output('medication_checklist.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
