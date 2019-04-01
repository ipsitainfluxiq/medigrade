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
    CURLOPT_URL => "http://influxiq.com:3020/getpatientrecordforpdf?id=".$id,
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
    CURLOPT_URL => "http://influxiq.com:3020/getpatientuniqueidforpatientrecordforpdf?id=".$result->patientid,
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
    CURLOPT_URL => "http://influxiq.com:3020/getrepidforpatientrecordforpdf?id=".$result1->addedby,
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


    

<table style="width: 100%; padding: 4px 0; background-color: #1C83B4;">
  <tr>
  
   <td style="text-align: center;  vertical-align: middle;">
    
    <table style="width: 100%;">
  <tr>
  
   <td style="text-align: center; width: 28%;">&nbsp; </td>
   
   <td style="text-align: center;  background-color: #295b73 ; width:4%;"> <img src="training_page_iconpdf.png" alt="#" style="line-height: 10px; width:50px;"> </td>
     
      <td style="text-align: center; vertical-align: middle; background-color: #295b73 ; width:40%;    font-size:14px!important;
    color: #fefefe;text-transform: uppercase;"><h1 style="font-size:14px; line-height:34px;">PATIENT PROFILE SHEET-(MEDICARE) </h1></td>
  <td style="text-align: center; width: 28%;">&nbsp; </td>
  </tr>

</table>
        

    </td>
  </tr>
 
</table>


<table style="width: 100%; padding: 4px 0 4px 0;">
  <tr>
   <td style=" vertical-align: middle;  width: 145px;     color: #295b73; font-size: 12px; "> <span>PRODUCT REQUESTED</span>
  </td>
  <td style=" vertical-align: middle;   width: 55px;    font-size: 12px;
    color: #295b73"><!--<span style="display: block"><input type="checkbox" name="box" value="1" readonly="true" />DME</span><br/>
   <span style="display: block"><input type="checkbox" name="box" value="1" readonly="true" />Rx</span><br/>
    <span style="display: block"><input type="checkbox" name="box" value="1" readonly="true" />PGX</span><br/>-->
  
<span style="display: block"><input type="checkbox" name="box1" id="box1" value="1" readonly="true"  checked="'.$result->cgx.'" />CGX</span><br/>
&nbsp;&nbsp;<span style="display: block"><input type="checkbox" name="box1" id="box1" value="1" readonly="true"  checked="'.$result->pgxval.'" />PGX</span>
   
   </td>
   
     <td style=" vertical-align: middle;  width: 60px;  color: #295b73; font-size: 12px;" valign="middle"> <span>Patient Id:</span>
</td>

 <td style=" vertical-align: middle;  width: 95px; color: #295b73; font-size: 12px;" valign="bottom">  <u>#'.$result1uniqueid.'</u></td>
   
  <td style=" vertical-align: middle;  width:500px; color: #295b73; font-size: 12px;" valign="middle"><span>ALTUS HEALTHCARE 610 W Congress Street Detroit, MI 48226
</span>
</td>
</tr>

</table>
<table style="width: 100%; border-top: solid 1px #000; padding-bottom:8px;">

 <tr>
 
   <td width="50%;"><span style="font-size: 12px; color: #295b73;  "><u>PATIENT INFORMATION</u></span>
      <br/>   
      <table style="width: 100%;">
        <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>First Name:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->firstname.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Last Name:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->lastname.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Best Phone #:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->phone.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Address:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->address.' </td>
        
         </tr>
         
         <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>City:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->city.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>State:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->state.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Zip:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->zip.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Date of Birth:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->dob.' </td>
        
         </tr>
         
        
         <tr>
          <td style="width: 30%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Gender:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 70%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->gender.' </td>
        
         </tr>
      
      
      </table>
      
      
   
   </td>
   
   <td width="2%;">&nbsp;</td>
   <td width="48%;">
   
    <table style="width: 100%; ">
         <br/>   <br/>  
          <tr>
          <td style="width: 32%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Race/Ethnicity:</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 68%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->race.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 32%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>HT/WT :</span> *</td>
          <td  style=" color: #5b5c5c; width: 30.5%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->height.' </td>
          <td  style=" color: #5b5c5c; width: 7%; text-align: center;  font-size: 12px; line-height: 20px; padding: 0px;">/</td>
          <td  style=" color: #5b5c5c; width: 30.5%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->width.' </td>
        
         </tr>
          
           <tr>
          <td style="width: 32%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Allergies :</span> *</td>
          <td collapse="3" style="  color: #5b5c5c; width: 68%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->allergies.' </td>
        
         </tr>
           <tr>
          <td style="width: 32%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Medicare Claim # :</span> *</td>
          <td collapse="3" style=" color: #5b5c5c; width: 68%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->medicareclaim.' </td>
        
         </tr>
   
</table>
   <span style="font-size: 12px; color: #295b73;"><u>SPECIAL NOTES</u></span>
     <br/>    
      <table style="width: 100%; ">
        <tr>
          <td style="width: 10%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>A) :</span></td>
          <td style=" color: #5b5c5c; width:90%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->notes1.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 10%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>B) :</span></td>
          <td style=" color: #5b5c5c; width:90%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->notes2.' </td>
        
         </tr>
         
           <tr>
          <td style="width: 10%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>C) :</span></td>
          <td style=" color: #5b5c5c; width:90%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->notes3.' </td>
        
         </tr>
           <tr>
          <td style="width: 10%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>D) :</span></td>
          <td style=" color: #5b5c5c; width:90%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->notes4.' </td>
        
         </tr>
         
         
      
      
      </table>
   
</td>
 
 </tr>
 
 </table>



<table style="width: 100%;  border-top: solid 1px #000; padding-bottom: 8px;">
 <tr>
 
   <td width="50%;"><span style="font-size: 12px; color: #295b73;  text-transform: uppercase;"><u>Pharmacy</u></span>
      <br/>  
      <table style="width: 100%;">
        <tr>
          <td style="width: 41%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>Pharmacy Insurance Name:</span></td>
          <td collapse="3" style=" color: #5b5c5c; width: 59%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pharmacyinsurancename.' </td>
        
         </tr>
         
          
          <tr>
          <td style="width: 28%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>ID #:</span></td>
          <td collapse="3" style=" color: #5b5c5c; width: 72%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pharmacyid.' </td>
        
         </tr>
         
          <tr>
          <td style="width: 28%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>BIN #:</span></td>
          <td collapse="3" style=" color: #5b5c5c; width: 72%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pharmacybin.' </td>
        
         </tr>
             
          <tr>
          <td style="width: 28%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>PCN #:</span></td>
          <td collapse="3" style=" color: #5b5c5c; width: 72%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pharmacypcn.' </td>
        
         </tr>
         
       
         <tr>
          <td style="width: 28%; font-size: 11px; color: #5b5c5c; line-height: 20px;"><span>GROUP #:</span></td>
          <td collapse="3" style=" color: #5b5c5c; width: 72%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pharmacygroup.' </td>
        
         </tr>
         
         
    
       
             <tr>
          <td style="width: 28%; font-size: 11px; color: #295b73; line-height: 20px;"><span>History / Reason:</span></td>
          <td collapse="3" style=" color: #5b5c5c; width: 72%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pharmacyhistory.' </td>
        
         </tr>
         
        <tr>
          <td style="width: 28%; font-size: 11px; color: #295b73; line-height: 20px;"><span>Area(s) of Issue:</span></td>
          <td collapse="3" style=" color: #5b5c5c; width: 72%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pharmacyissue.' </td>
        
         </tr>
         <tr>
          <td style="width: 28%; font-size: 11px; color: #295b73; line-height: 20px;"><span>Treatments:</span></td>
          <td collapse="3" style=" color: #5b5c5c; width: 72%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pharmacytreatment.' </td>
        
         </tr>
      
      </table>
      
      
   
   </td>
   
   <td width="2%;">&nbsp;</td>
   <td width="48%;"><span style="font-size: 12px; color: #295b73; text-transform: uppercase;"><u>Products Requested</u></span>
     <br/>        <br/> 
      <table style="width: 100%; ">
        <tr>
          <td style=" vertical-align: middle; width:370px;     font-size: 11px;
    color: #5b5c5c"><span style="display: block "><input type="checkbox" name="box" value="1" readonly="true"  checked="'.$result->topicalpain.'"/>TOPICAL PAIN

</span><br/><br/>
   <span style="display: block"><input type="checkbox" name="box" value="1" readonly="true" checked="'.$result->oralpain.'"/>ORAL PAIN

</span><br/><br/>
    <span style="display: block"><input type="checkbox" name="box" value="1" readonly="true"  checked="'.$result->derma.'"/>DERMA</span><br/><br/>
    <span style="display: block"><input type="checkbox" name="box" value="1" readonly="true"  checked="'.$result->migrane.'"/>MIGRAINE/HA

</span>
   
   </td>
         </tr>
         
          
         
         
      
      
      </table>
   
</td>
 
 </tr>
 
 </table>




<table style="width: 100%;  border-top: solid 1px #000; padding-top:4px;">

   <tr>
   <td style="width:16%;"><span style=" font-size: 10px; color: #295b73;"><u>QUESTIONNAIRE</u></span></td>
       <td style="text-align:right; width:9%;"><span style=" font-size: 10px; color: #5b5c5c;">TYPE <span style="color: #ff0000">*</span></span></td>
        <td style="text-align:right; width:2%;"><span style=" font-size: 10px; color: #5b5c5c;">&nbsp;</span></td>
      <td style="text-align:right; width:9%;"><span style=" font-size: 10px; color: #5b5c5c;">TYPE</span></td>
      <td style="text-align:right; width:14%; "><span style=" font-size: 10px; color: #5b5c5c;">AGE DIAGNOSED</span></td>
       <td style="text-align:right; width:14%;"><span style=" font-size: 10px; color: #5b5c5c;">IF DECEASED,</span></td>
         <td style="width:18%;"><span style=" font-size: 10px; color: #295b73;"><u>TYPE OF CANCER</u></span></td>
   <td style="width:14%;"><span style=" font-size: 10px; color: #295b73;"><u>MEDICATION LIST</u></span></td>
   
   </tr>

</table>


<table style="width: 100%; border-bottom: solid 1px #000;">

   <tr>
   
   
   
   
   <td style="width:16%; text-align:right; ">
<table><tr><td><strong style=" font-size: 10px; color: #545656; display:block; line-height:11px;">PERSONAL HISTORY:</strong></td></tr></table>
<table><tr><td><strong style=" font-size: 10px; color: #545656; display:block; line-height:11px;">FAMILY HISTORY:</strong></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656; display:block; line-height:11px;">MOTHER:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656; line-height:11px;">FATHER:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656; line-height:11px;">DAUGHTER:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656; line-height:11px;">SON:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656; line-height:11px;">BROTHER:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656; line-height:11px;">SISTER:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656; line-height:11px;">NEPHEW:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656; line-height:11px;">NIECE:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656;  line-height:11px;">UNCLE:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656;  line-height:11px;">AUTN:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656;  line-height:11px;">MOM\'S FATHER:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656;  line-height:11px;">MOM\'S MOTHER:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656;  line-height:11px;">DAD\'S FATHER:</span></td></tr></table>
<table><tr><td><span style=" font-size: 10px; color: #545656;  line-height:11px;">DAD\'S MOTHER:</span></td></tr></table>
<table><tr><td><i style=" font-size: 10px; color: #545656;  line-height:11px;">OTHER:</i></td></tr></table>
<table><tr><td><i style=" font-size: 10px; color: #545656;  line-height:11px;">OTHER:</i></td></tr></table>
<table><tr><td><i style=" font-size: 10px; color: #545656;  line-height:11px;">OTHER:</i></td></tr></table>
</td>







<td style="text-align:right; width:9%;">


<table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 14px; padding: 0px; text-align:right;">'.$result->phtype1.'</td>
</tr>
</table>


<table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; font-size: 11px; line-height: 27px; padding: 0px; text-align:right;">&nbsp;</td>
</tr>
</table>



<table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 19px; padding: 0px; text-align:right;">'.$result->motype1.'</td>

    </tr>
    </table>
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->fatype1.'</td>

    </tr>
    </table>
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->dautype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->sontype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->brotype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->sistype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->neptype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->niecetype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->unctype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->autntype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->moftype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->momotype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->daftype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->damtype1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->oth1type1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->oth2type1.'</td>

    </tr>
    </table>
    
    <table style="width:100%;">
    <tr>
 <td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->oth3type1.'</td>

    </tr>
    </table>
    
    
    </td>

    
    
   
      <td style="text-align:right; width:2%;">
      

<table><tr><td style="line-height:15px;"><span style=" font-size: 11px; color: #545656; display:block; ">&nbsp;</span></td></tr></table>
<table><tr><td style="line-height:15px;"><span style=" font-size: 11px; color: #545656; display:block; ">&nbsp;</span></td></tr></table>

<table><tr><td style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td  style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block;">,</span></td></tr></table>
<table><tr><td  style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td  style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block;">,</span></td></tr></table>
<table><tr><td  style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td  style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td  style="line-height:20px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td  style="line-height:24px;"><span style=" font-size: 11px; color: #545656; display:block;">,</span></td></tr></table>
<table><tr><td  style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td  style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block;">,</span></td></tr></table>
<table><tr><td style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block;">,</span></td></tr></table>
<table><tr><td style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block;">,</span></td></tr></table>
<table><tr><td style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block;">,</span></td></tr></table>
<table><tr><td style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
<table><tr><td style="line-height:22px;"><span style=" font-size: 11px; color: #545656; display:block; ">,</span></td></tr></table>
      
      
      </td>







 <td style="text-align:right; width:9%;"><span style=" font-size: 11px; color: #5b5c5c;">
 
 
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 14px; padding: 0px; text-align:right;">'.$result->phtype2.'</td>
</tr>
</table>

<table style="width:100%;">
 <tr>
<td   style=" color: #5b5c5c; width: 100%; font-size: 11px; line-height: 27px; padding: 0px; text-align:right;">&nbsp;</td>
    </tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 19px; padding: 0px; text-align:right;">'.$result->motype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->fatype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->dautype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->sontype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->brotype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height:21px; padding: 0px; text-align:right;">'.$result->sistype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->neptype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height:22px; padding: 0px; text-align:right;">'.$result->niecetype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->unctype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->autntype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->moftype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->momotype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->daftype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->damtype2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->oth1type2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->oth2type2.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->oth3type2.'</td>
</tr>
</table>


</span></td>




<td style="text-align:right; width:14%; "><span style=" font-size: 11px; color: #5b5c5c;">

<table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 14px; padding: 0px; text-align:right;">'.$result->phage.'</td>
</tr>
</table>



<table style="width:100%;">
 <tr>
<td   style=" color: #5b5c5c; width: 100%; font-size: 11px; line-height: 27px; padding: 0px; text-align:right;">&nbsp;</td>
    </tr>
</table>

 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 19px; padding: 0px; text-align:right;">'.$result->moage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->faage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->dauage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->sonage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->broage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->sisage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->nepage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->nieceage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->uncage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->autnage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 21px; padding: 0px; text-align:right;">'.$result->mofage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->momoage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->dafage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->damage.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 24px; padding: 0px; text-align:right;">'.$result->oth1age.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->oth2age.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height:22px; padding: 0px; text-align:right;">'.$result->oth3age.'</td>
</tr>
</table>



</span></td>




       <td style="text-align:right; width:12%;">
       
       
<table style="width:100%;">
 <tr>
<td  style=" color: #5b5c5c; width: 100%;  font-size: 11px; line-height: 14px; padding: 0px; text-align:center;">AGE AT<br/>
DEATH</td>
    </tr>
</table>


<table style="width:100%;">
 <tr>
<td   style=" color: #5b5c5c; width: 100%; font-size: 11px; line-height:12px; padding: 0px; text-align:right;">&nbsp;</td>
    </tr>
</table>

 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px; text-align:right;">'.$result->modead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->fadead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->daudead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->sondead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->brodead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->sisdead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->nepdead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 23px; padding: 0px; text-align:right;">'.$result->niecedead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 23px; padding: 0px; text-align:right;">'.$result->uncdead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 23px; padding: 0px; text-align:right;">'.$result->autndead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 23px; padding: 0px; text-align:right;">'.$result->momodead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->mofdead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->dafdead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->damdead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->oth1dead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->oth2dead.'</td>
</tr>
</table>
 <table style="width:100%;">
<tr>
<td  style=" color: #5b5c5c; width: 100%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px; text-align:right;">'.$result->oth3dead.'</td>
</tr>
</table>

 </td>
 
 
       
       
       
       
       
         <td style="width:15%; line-height: 13px;">
<span style="font-size: 12px; color: #545656;">* <u>Breast</u></span><br/>
 <span style="font-size: 12px; color: #545656;">* <u>Ovarian</u></span><br/>
  <span style="font-size: 12px; color: #545656;">* Digestive</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Pancreatic</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Colon</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Rectal</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Gallbladder</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Intestinal</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Stomach</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Esophageal</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Throat</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Liver</span><br/>

 <span style="font-size: 11px; color: #545656;">* Lung</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;- Other Respiratory</span><br/>

 <span style="font-size: 11px; color: #545656;">* Genital</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Cervical</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Uterine</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Endometrial</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Other Genital Organs</span><br/>

 <span style="font-size: 11px; color: #545656;">* Prostate</span><br/>
 <span style="font-size: 11px; color: #545656;">* Testicular</span><br/>
 <span style="font-size: 11px; color: #545656;">* Kidney</span><br/>
 <span style="font-size: 11px; color: #545656;">* Bladder</span><br/>
  <span style="font-size: 11px; color: #545656;">&nbsp;&nbsp;&nbsp;- Urinary Tract</span><br/>

 <span style="font-size: 11px; color: #545656;">* Leukemia</span><br/>
 <span style="font-size: 11px; color: #545656;">* Lymphatic</span><br/>
 <span style="font-size: 11px; color: #545656;">* Other Organ Systems</span>
         
         </td>
         
         
         
         
         
         
   <td style="width:20%;"><table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 15px; padding: 0px;">1.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 15px; padding: 0px;">'.$result->pgx1.'</td></tr></table>
<table style="width:100%;"><tr><td style="line-height: 26px;">&nbsp;</td></tr></table>

<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">2.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx2.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">3.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx3.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">4.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx4.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">5.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx5.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 22px; padding: 0px;">6.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px;">'.$result->pgx6.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 22px; padding: 0px;">7.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px;">'.$result->pgx7.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 22px; padding: 0px;">8.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 22px; padding: 0px;">'.$result->pgx8.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">9.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx9.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">10.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx10.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">11.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx11.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">12.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx12.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">13.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx13.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">14.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx14.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">15.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx15.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">16.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx16.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">17.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx17.'</td></tr></table>
<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 20px; padding: 0px;">18.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 20px; padding: 0px;">'.$result->pgx18.'</td>
</tr></table>


<table style="width:100%;"><tr>
<td  style=" color: #5b5c5c; width: 19%;  font-size: 11px; line-height: 30px; padding: 0px;">19.</td>
<td  style=" color: #5b5c5c; width:65%; border-bottom: solid 1px #b3b3b4; font-size: 11px; line-height: 30px; padding: 0px;">'.$result->pgx19.'</td>

</tr></table>




   </td>
   
   
   
   
   
   
   </tr>

</table>




<table style="width: 100%; padding-top: 4px;">
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
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('ppqformpdf.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
