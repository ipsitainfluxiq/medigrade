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
  CURLOPT_URL => "http://greenvalleyportal.com:3020/getpatientrecordforpdf?id=".$id,
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
echo $result->phone;*/
//exit;

$curl1 = curl_init();
curl_setopt_array($curl1, array(
  CURLOPT_URL => "http://greenvalleyportal.com:3020/getpatientuniqueidforpatientrecordforpdf?id=".$result->patientid,
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
  CURLOPT_URL => "http://greenvalleyportal.com:3020/getrepidforpatientrecordforpdf?id=".$result1->addedby,
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
   
  <td style=" vertical-align: middle;  width:520px; color: #295b73; font-size: 11px;" valign="middle"><span>GREEN VALLEY HEALTHCARE 722 Weiland Road Rochester NY 14626
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


<table style="width: 100%;  border-top: solid 1px #000; padding-top:6px;">

<tr>
<td>
<span style="font-size: 13px; color: #295b73;  text-transform: uppercase;"><u>MEDICAL INSURANCE INFORMATION</u></span><br/>
<table style="width: 100%; padding: 10px 0;">
<tr>
<td>
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance1.'"/><span style="color: #295b73;">Medicare</span></span>&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance2.'"/><span style="color: #295b73;">Medadvantage</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance3.'"/><span style="color: #295b73;">Commercial</span></span>&nbsp;&nbsp;
<span style="display: block; font-size: 13px; "><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->insurance4.'"/><span style="color: #295b73;">None</span></span>
</td>
</tr>
</table>

<!--Medicare contain-->

<table style="width: 100%;">
<tr>
<td style=" font-size: 12px; color: #337AB7; line-height: 20px;">Medicare Details</td>
</tr>
</table>

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
</tr>


</table>     





<!--Commercial contain-->

<br/><br/>

<table style="width: 100%;">
<tr>
<td style="width: 155px; font-size: 12px; color: #333; line-height: 20px;"><span>Carrier:</span></td>
<td collapse="3" style=" font-size: 12px; color: #333; width: 150px; border-bottom: solid 1px #b3b3b4;  line-height: 20px; padding: 0px;">'.$result->carrier.'</td>
</tr>
<tr>
<td style="width: 155px;  font-size: 12px; color: #333; line-height: 20px;"><span>Plan Type:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierplan.'</td>
</tr>
<tr>
<td style="width: 155px; font-size: 12px; color: #333; line-height: 20px;"><span>Policy Number:</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->carrierpolicyno.'</td>
</tr>
<tr>
<td style="width: 155px; font-size: 12px; color: #333; line-height: 20px;"><span>Is this your primary policy?</span></td>
<td collapse="3" style=" color: #333; width: 150px; border-bottom: solid 1px #b3b3b4; font-size: 12px; line-height: 20px; padding: 0px;">'.$result->comprimarypolicy.'</td>
</tr>
</table>     

       
         
  
  <br/>
</td>
</tr>

</table>


<table style="width: 100%;  border-top: solid 1px #000; padding-top:6px;">

<tr>
<td>
<span style="font-size: 13px; color: #295b73;  text-transform: uppercase;"><u>PATIENT QUESTIONNAIRE<!-- for "data farming"--></u></span><br/>


<table style="width: 100%; padding-top: 6px;">
<tr>
<td width="100%" >

<span style="display: block; font-size: 12px; color: #333; line-height: 17px; "><span style="color: #333;">Do you use Diabetic supplies (meters, strips, lancets, needles, etc)?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->diabetic_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333; ">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span> -->
</span>
<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you use Wound care supplies?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->wound_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>
<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you have or have you ever used a brace for pain relief?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->pain_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>

<br/>
<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you use topical creams?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->topical_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>
<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Have you ever tried Braces?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->braces_sup.'</span></span> 
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>
<br/>
<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you use as Walker?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->walker_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>

<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you use a Scooter?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->scooter_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>

<br/>
<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you have Allergies?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->allergies_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>

<br/>

<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Do you use Catheters?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->catheters_sup.'</span></span>
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>
<br/>
<span style="display: block; font-size: 12px; color: #333; line-height: 17px;"><span style="color: #333;">Have you ever had cancer?&nbsp;&nbsp;<span style="padding-left: 5px; text-decoration: underline;">'.$result->cancer_sup.'</span></span> 
<!--<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">Yes</span>&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true"/><span style="color: #333;">No</span>-->
</span>


</td>

</tr>
</table>



</td>
</tr>
</table>



';

$html2 ='


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


<table style="width: 100%;  padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
       <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->phtype2.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Paternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->phage.'</td>
    </tr>
    </table>
   </td>
 
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>


   
   </tr>

</table>





<table style="width: 100%;  padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->motype2.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->moage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->modead.'</td>
    </tr>
    </table>


</td>

 
   
   </tr>

</table>


<table style="width: 100%;  padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->fatype2.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->faage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->fadead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>

<table style="width: 100%;  padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   
  <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->dautype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->dauage.'</td>
    </tr>
    </table>
   </td>
 
<td 
 style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->daudead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>

<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->sontype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->sonage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->sondead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>


<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->brotype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->broage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->brodead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>


<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   
  <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->sistype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->sisage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->sisdead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>

<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   
  <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->neptype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->nepage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->nepdead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>


<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->niecetype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->nieceage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->niecedead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>

<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->unctype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->uncage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->uncdead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>


<table style="width: 100%; padding:1px 0;">

   <tr>
<td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   
  <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->autntype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->autnage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->autndead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>


<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->moftype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->mofage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->momodead.'</td>
    </tr>
    </table>


</td>

   
   </tr>

</table>

<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->momotype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->momoage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->mofdead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>


<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->daftype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->dafage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->dafdead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>

<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->damtype1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->damage.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->damdead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>

<table style="width: 100%; padding:1px 0;">

   <tr>
  <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->oth1type1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->oth1age.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->oth1dead.'</td>
    </tr>
    </table>


</td>


   
   </tr>

</table>

<table style="width: 100%; padding:1px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>

    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->oth2type1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->oth2age.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->oth2dead.'</td>
    </tr>
    </table>


</td>

   
   </tr>

</table>



<table style="width: 100%; padding:1px 0 6px 0;">

   <tr>
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
       
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>




<td  style=" color: #5b5c5c; width:16%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
   <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">&nbsp;</td>
    </tr>
    </table>
   </td>
    <td  style=" color: #5b5c5c; width:14%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->oth3type1.'</td>
    </tr>
    </table>
   </td>
   
     <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">Maternal</td>
    </tr>
    </table>
   </td>
   

   <td  style=" color: #5b5c5c; width:10%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">1st</td>
    </tr>
    </table>
   </td>
   
   <td  style=" color: #5b5c5c; width:12%;  font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">
    <table style="width:95%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:99%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;  text-align:left;">'.$result->oth3age.'</td>
    </tr>
    </table>
   </td>
 
<td  style=" color: #5b5c5c; width: 12%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:left;">
<table style="width:99%;"> 
    <tr>
         <td  style=" color: #5b5c5c; width:100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px; text-align:left;">'.$result->oth3dead.'</td>
    </tr>
    </table>


</td>

 
   </tr>

</table>






<table style="width: 100%;  border-top: solid 1px #000; padding-top:12px; ">
<tr>
 <td  style=" width:36%;font-size: 14px; line-height: 20px; padding: 0px;">&nbsp;</td>
  <td  style=" color: #646666; width:8%; font-size: 14px; line-height: 20px; padding: 0px;"><span style="font-size: 13px; color: #295b73;">Rep ID:</span></td>

 <td  style=" color: #646666; width:20%; border-bottom: solid 1px #646666; font-size: 14px; line-height: 20px; padding: 0px;">#'.$result2uniqueid.'</td>
 <td  style=" color: #646666; width:36%; font-size: 14px; line-height: 20px; padding: 0px;">&nbsp;</td>

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

$pdf->SetY(268);
$pdf->writeHTML($html2, true, false, true, false, '');
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('ppqformpdf.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
