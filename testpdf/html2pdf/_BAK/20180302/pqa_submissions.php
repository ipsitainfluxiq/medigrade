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
require_once( ai_cascadepath('includes/plugins/html2pdf/tcpdf/examples/tcpdf_include.php') );
//require_once('tcpdf_include.php');
class MYPDF extends TCPDF {
    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
       // $this->SetY(-10);
        $this->SetY(-10);
      //  $this->SetX(28);
        // Set font
        $this->SetFont('helvetica', 8);
        // Page number
        //$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        // $this->Cell(0, 10, $this->getAliasNumPage(), 0, false, 'C', 0, '', 0, false, 'T', 'M');

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
$pdf->SetMargins(PDF_MARGIN_LEFT, 0, PDF_MARGIN_RIGHT);

$pdf->SetLeftMargin(5);
$pdf->SetRightMargin(5);


$pdf->setPrintHeader(false);
//$pdf->setPrintFooter(false);

$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);






// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, 0);
//$pdf->SetAutoPageBreak(TRUE, 0);

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
$pdf->SetFont('helvetica');



// add a page
$pdf->AddPage();

if(isset($_GET['doctor_id'])){
    global $AI;
    $doctor_id=base64_decode($_GET['doctor_id']);
    $sql=db_query("select * from pqa_submission_step1 where doctor_id=".$doctor_id);
    $row=db_fetch_assoc($sql);
    $row['md_npi']=base64_decode($row['md_npi']);
   // $row['principal_ss_number']=base64_decode($row['principal_ss_number'], -4);

   /* if($AI->user->account_type=='Internal Review'){
        $row['principal_ss_number']  =base64_decode($row['principal_ss_number']);
    }
    else{
        $row['principal_ss_number']  ='**********';
    }*/
   if(isset($_GET['type'])){
       if($row['principal_ss_number']!=''){
           if($_GET['type']=='unencrypted'){
               $row['principal_ss_number']  =base64_decode($row['principal_ss_number']);
           }
           else{
               $row['principal_ss_number']  ='*********';
           }

       }
       else{
           $row['principal_ss_number']  ='';
       }
   }

   // $row['principal_ss_number']='******'.substr(base64_decode($row['principal_ss_number']), -4);
    ;
    $mdhtml='';
    if($row['md_exists']==1) {
        $mdhtml = '
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Supervising MD Name</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['md_name'] . '</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:8px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Specialty</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['md_speciality'] . '</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>



<span style=" line-height:8px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Address</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['md_address'] . '</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>


<span style=" line-height:8px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">City</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="15%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['md_city'] . '</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
    
     <td width="9%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">State</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="16%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['md_state'] . '</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
     <td width="7%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Zip</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="11%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['md_zip'] . '</span>&nbsp;&nbsp;</span></td>
    
    
      <td width="3%;">&nbsp;</td>
  </tr>
</table>
 
 

<span style=" line-height:8px;"><br></span>





  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Contact Phone</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['md_phone'] . '</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
';
    }

    $currentlyemployed='';
    if($row['is_employed']=='Yes') {
        $currentlyemployed = '<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">Name </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['employed_name'] . ' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>


<span style=" line-height:8px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Phone</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="21%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['employed_phone'] . '</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
    
     <td width="11%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Email </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="21%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>' . @$row['employed_email'] . ' </span>&nbsp;&nbsp;</span></td>

      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>';
    }
}
$breakdown_pvt1_arr = json_decode($row['breakdown_pvt1']);
$noofval = count($breakdown_pvt1_arr);

$insurence='';
for($i=0;$i<$noofval;$i+=2){
  //  echo $breakdown_pvt1_arr[$i];
    $insurence .='<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="6%;"><span style="font-size:10px; color:#444444;line-height: 10px; text-align: right;">'.($i+1).'</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="40%;" style=" background-color:#fff;"><span style=" background-color:#fff; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$breakdown_pvt1_arr[$i].' </span>&nbsp;&nbsp;</span>
    <br/>
    <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_deviderimg2.jpg"  width="800px"/>
    </td>
 
   
      '.((@$breakdown_pvt1_arr[$i+1]!='')?'<td width="2%;">&nbsp;</td>
     <td width="6%;"><span style="font-size:10px; color:#444444;line-height: 10px; text-align: right;">'.($i+2).'</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="40%;" style=" background-color:#fff;"><span style=" background-color:#fff; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span> '.@$breakdown_pvt1_arr[$i+1].'</span>&nbsp;&nbsp;</span>
    <br/>
    <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_deviderimg2.jpg"  width="800px"/>
    </td>
      <td width="3%;">&nbsp;</td>':'').

  '</tr>
  
</table>';
}


$html = '

<div style="border-top: 6px solid #1a77bc; border-left: 6px solid #1a77bc; border-right: 6px solid #1a77bc;">

<!--<span><br></span>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="2%;">&nbsp;</td>
    <td width="96%;"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_img1.jpg"  width="800px"/></td>
   
      <td width="2%;">&nbsp;</td>
  </tr>
</table>


<div>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="2%;">&nbsp;</td>
    <td width="96%;" style="text-align: center"> <span style="display: inline-block; background-color: #1598cc; color: #fff;  line-height: 35px;">&nbsp;&nbsp;Yes&nbsp;&nbsp;</span>  <span style="display: inline-block; background-color: #adafae; color: #2b2b2b;  line-height: 35px;">&nbsp;&nbsp;&nbsp;No&nbsp;&nbsp;&nbsp;</span></td>
   
      <td width="2%;">&nbsp;</td>
  </tr>
</table>
<span><br></span>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="28%;" ><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Field Relation To Doctor</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="66%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['relation_to_dcotor'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>

  </table>
    <span><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="28%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Full Name</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="66%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['fullname'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="28%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Email Address</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="66%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['email'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>-->


<span style=" line-height:5px;"><br></span>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="2%;">&nbsp;</td>
    <td width="96%;"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_img2.jpg"  width="800px" height="50px"/></td>
   
      <td width="2%;">&nbsp;</td>
  </tr>
</table>


  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Name of Primary Practitioner</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_name'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Practice Name</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practice_name'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Address</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_address'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">City</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="15%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_city'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
    
     <td width="9%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">State</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="16%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_state'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
     <td width="7%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Zip</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="11%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_zip'].'</span>&nbsp;&nbsp;</span></td>
    
    
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Office Phone</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_office_phone'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>


<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Direct Line/Extension</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="21%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_direct_line'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
    
     <td width="13%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Office Fax</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="25%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_office_fax'].'</span>&nbsp;&nbsp;</span></td>

      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>



<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Conatct Name</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_contact_name'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Title</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_title'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Cell Phone</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_cell'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Email</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['practitioner_email'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>



<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">If supervising MD Requirement Exists</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.((@$row['md_exists']==1)?'Yes':'No').'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>
'.$mdhtml.'


 






  <table width="100%" border="0" cellspacing="0" cellpadding="0" >
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">NPI #</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['md_npi'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="2%;">&nbsp;</td>
    <td width="96%;"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_img6.jpg"  width="800px" height="50px"/></td>
   
      <td width="2%;">&nbsp;</td>
  </tr>
</table>



  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Name </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['npi_name'].' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Taxonomy </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['npi_taxonomy'].' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Address  </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['npi_address'].'  </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">City</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="14%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['npi_city'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
    
     <td width="9%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">State</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="16%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['npi_state'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
     <td width="7%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Zip</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="12%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['npi_zip'].'</span>&nbsp;&nbsp;</span></td>
    
    
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Phone   </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['npi_phone'].'  </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>


<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="34%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Fax    </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="60%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['npi_fax'].'   </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>




<span style=" line-height:5px;"><br></span>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="2%;">&nbsp;</td>
    <td width="96%;"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_img3.jpg"  width="800px" height="50px"/></td>
   
      <td width="2%;">&nbsp;</td>
  </tr>
</table>


  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Number of Docs in Practice</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['no_of_doctor_practice'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Average number of patients per day</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['no_of_patient_perday'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">Do you have a med tech currently employed?</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['is_employed'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>'.@$currentlyemployed.'




<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    
    <td width="43%;"><span style="font-size:10px; color:#444444;line-height: 8px; text-align: right;">% of patients over 50 yers old with one of the&nbsp;&nbsp;&nbsp;<br/>following conditions</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['over_fifty'].' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">% of patients over 70 years old</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['over_seventy'].' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>


<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">Is Obesity Counseling Offered? </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['is_obesity'].' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>


<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">Do You treat Neuropathy patients in house? </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['is_neuropathy_patient'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
   
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">Is any part of your practice Holistic? </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="54%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['is_practice_holistic'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">% of Medicare Patients  </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="20%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['medicare_patient'].' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
 
<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">% of Medicaid Patients  </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="20%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['medicaid_patient'].' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
 
<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: right;">% of Private Insurance Patients  </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="20%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['private_insurance_patient'].' </span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<!--<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="40%;">&nbsp;</td>
    <td width="40%;"><span style="font-size:10px; color:#444444;line-height: 18px; text-align: left;">% of Private Insurance Patients</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>-->

<span style=" line-height:5px;"><br></span>

  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="94%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: left;">Breakdown of Private Insurance<span style="color: #ff0000;"></span></span></td>
   
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>'.$insurence.'



  <!--<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="6%;"><span style="font-size:10px; color:#444444;line-height: 10px; text-align: right;">1</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="40%;" style=" background-color:#fff;"><span style=" background-color:#fff; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['breakdown_pvt1'].' </span>&nbsp;&nbsp;</span><br/>
    <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_deviderimg2.jpg"  width="800px"/>
    </td>
    
       <td width="2%;">&nbsp;</td>
     <td width="6%;"><span style="font-size:10px; color:#444444;line-height: 10px; text-align: right;">2 </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="40%;" style=" background-color:#fff;"><span style=" background-color:#fff; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['breakdown_pvt2'].' </span>&nbsp;&nbsp;</span>
    <br/>
    <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_deviderimg2.jpg"  width="800px"/>
    </td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="6%;"><span style="font-size:10px; color:#444444;line-height: 10px; text-align: right;">3</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="40%;" style=" background-color:#fff;"><span style=" background-color:#fff; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['breakdown_pvt3'].' </span>&nbsp;&nbsp;</span>
    <br/>
    <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_deviderimg2.jpg"  width="800px"/>
    </td>
    
       <td width="2%;">&nbsp;</td>
     <td width="6%;"><span style="font-size:10px; color:#444444;line-height: 10px; text-align: right;">4</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="40%;" style=" background-color:#fff;"><span style=" background-color:#fff; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span> '.@$row['breakdown_pvt4'].'</span>&nbsp;&nbsp;</span>
    <br/>
    <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_deviderimg2.jpg"  width="800px"/>
    </td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>-->





<span style=" line-height:5px;"><br></span>

<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="2%;">&nbsp;</td>
    <td width="96%;"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_img4.jpg"  width="800px" height="50px"/></td>
   
      <td width="2%;">&nbsp;</td>
  </tr>
</table>



  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;"> Legal Name of Business</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="64%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['legal_business_name'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;"> Type of Entity</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="64%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span> '.@$row['entity_type'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Location of Entity – City</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="24%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['entity_city'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
    
     <td width="13%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">State </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="26%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['entity_state'].' </span>&nbsp;&nbsp;</span></td>

      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;"> Date Established</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="64%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['date_established'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Federal Tax ID</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="64%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['federal_tax_id'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;"> Principal Owners Name</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="64%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span> '.@$row['principal_name'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;"> Principal Owners SS#</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="64%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span> '.@$row['principal_ss_number'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>


<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Principal Owners Date of Birth</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="64%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['principal_dob'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Principal Owners Home Address</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="64%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['principal_home_address'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>




<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">City</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="15%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['principal_city'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
    
     <td width="9%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">State</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="19%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['principal_state'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
     <td width="7%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Zip</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="12%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['principal_zip'].'</span>&nbsp;&nbsp;</span></td>
    
    
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>


<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="30%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Principal Owners Home Phone</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="24%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['principal_phone'].'</span>&nbsp;&nbsp;</span></td>
     <td width="1%;">&nbsp;</td>
    
     <td width="13%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: right;">Cell Phone</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="26%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['principal_cell'].'</span>&nbsp;&nbsp;</span></td>

      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="2%;">&nbsp;</td>
    <td width="96%;"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pqa_submissions_img5.jpg"  height="50px"  width="800px" /></td>
   
      <td width="2%;">&nbsp;</td>
  </tr>
</table>


  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
     <td width="1%;" style="background-color: #1a78bd;">&nbsp;</td>
     <td width="2%;">&nbsp;</td>
    <td width="91%;"><span style="font-size:18px; color:#444444;line-height:24px; text-align: left;">Disclaimer</span></td>
   
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="94%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: left;">By signing below applicant represents and warrants that all credit and financial information submitted to is true and correct and that NexMedical may use any information necessary pertaining to this application including, but not limited to, owners, officers, or guarantors. The undersigned individual, recognizing that his or her individual credit history may be a factor in the evaluation of the applicant, as may be needed in the evaluation and review process and waives any right or claim they would otherwise have under the fair credit reporting act in the absence of this continuing consent.</span> </td>

      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>

  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="12%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: left;">Your Name</span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="82%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.@$row['signature'].'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>
<span style=" line-height:5px;"><br></span>
 <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="12%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: left;">Date </span> <span style="color: #ff0000;"></span> :&nbsp;&nbsp;&nbsp;</td>
    <td width="82%;" style=" background-color:#eceaea;"><span style=" background-color:#eceaea; line-height:14px; color:#444444; font-size:10px;">&nbsp;&nbsp;<span>'.($row['signature_time']!=''?date('F d, Y  H:i:s A',@$row['signature_time'] ):'').'</span>&nbsp;&nbsp;</span></td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>

<span style=" line-height:5px;"><br></span>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="3%;">&nbsp;</td>
    <td width="12%;"><span style="font-size:10px; color:#444444;line-height:14px; text-align: left;">Signature</span>  :&nbsp;&nbsp;&nbsp;</td>
    <td width="82%;">&nbsp;</td>
      <td width="3%;">&nbsp;</td>
  </tr>
  
</table>



</div>  

';

$html5 = '

<div style="background-color: #e1e1e1;  border-left: 6px solid #1a77bc; border-right: 6px solid #1a77bc; border-bottom: 6px solid #1a77bc;">


<span style="color:#444444; text-align: center; font-weight: bold; font-size: 50px; ">'.@$row['signature'].'</span>


</div>





';



/*is_employed*/
$pdf->SetY(6);
// output the HTML content
$pdf->writeHTML($html, true, 0, true, true);
/*if($row['md_exists']==0){
    $pdf->SetY(158);
}*/
/*$pdf->writeHTML($html11, true, 0, true, true);


$pdf->writeHTML($html12, true, 0, true, true);

$pdf->writeHTML($html2, true, 0, true, true);
/*$pdf->SetY(146);
if($row['md_exists']==0){
    $pdf->SetY(60);
}*/
/*$pdf->writeHTML($html3, true, 0, true, true);


$pdf->writeHTML($html4, true, 0, true, true);*/


$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '');
$pdf->SetFont($fontname, '', 30, '', false);
$pdf->SetLeftMargin(6);
$pdf->SetRightMargin(6);
/*$pdf->SetY(86);
if($row['md_exists']==0){
    $pdf->SetY(10);
}*/
$pdf->writeHTML($html5, true, false, true, false, '');





// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('pqa_submissions.pdf', 'I');


//============================================================+
// END OF FILE
//============================================================+
?>
<script>
  /*  @page { margin-bottom: -10px; }
    body { margin-bottom: -10px; }*/
</script>
