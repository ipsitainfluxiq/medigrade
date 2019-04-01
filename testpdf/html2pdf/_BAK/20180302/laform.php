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


global $AI;

if(isset($_GET['id'])){
    $userId = base64_decode($_GET['id']);
    $leasedata = $AI->db->GetAll("SELECT * FROM `lease_application` WHERE `lead_id` = ".intval($userId));
    if(count($leasedata)){
        $leasedata = $leasedata[0];
        require_once( ai_cascadepath('includes/plugins/tags/class.tags.php') );
        $tags = new C_tags('lead_management',intval($userId));
        if(intval($userId) == $AI->user->lead_id){
            db_perform('lead_management',array('la_download'=>1),'update','id='.intval($userId));
            db_perform('lease_application',array('activity'=>1),'update','id='.$leasedata['id']);
            $tags->add([$tags->tag_id_to_tag_new(139)]);
        }else{
            $tags->add([$tags->tag_id_to_tag_new(140)]);
        }
    }else{
        util_redirect('dashboard');
    }
}else{
    util_redirect('dashboard');
}

// Include the main TCPDF library (search for installation path).
require_once( ai_cascadepath('includes/plugins/html2pdf/tcpdf/examples/tcpdf_include.php') );
//require_once('tcpdf_include.php');
class MYPDF extends TCPDF {

    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        //$this->SetY(-50);
        //$this->SetX(-18);
        // Set font
        $this->SetFont('helvetica', 6);

        // Page number
        //$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        $this->Cell(0, 10, $this->getAliasNumPage(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
       // $this->Cell(0, 10, 'Confidentiality Agreement', 0, false, 'C', 0, '', 0, false, 'T', 'M');
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

$pdf->SetLeftMargin(5);
$pdf->SetRightMargin(5);

$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);


$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

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
$pdf->SetFont('helvetica');



// add a page
$pdf->AddPage();


$html = '
<h1 style="margin: 0; padding: 0; display: block; text-align: center; text-transform: uppercase; font-size: 26px; color: #000;">Lease Application</h1>

<table style="width: 100%;">
<tr>
  <td  style="width: 15%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Name of Practice:</label></td>
<td style="width:40%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['name_of_practice'].'</td>
  <td  style="width: 17%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Primary Practitioner:</label></td>
<td style="width: 28%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['primary_practitioner'].'</td>
</tr>

</table>
<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 9%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Address: </label></td>
<td style="width:46%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['address'].'</td>
  <td  style="width: 5%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">City:</label></td>
<td style="width: 10%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['city'].'</td>
  <td  style="width: 4%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">St:</label></td>
<td style="width: 11%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['state'].'</td>
  <td  style="width: 5%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;"> ZIP:</label></td>
<td style="width: 10%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['zip'].'</td>
</tr>

</table>
<br/><br/>

<table style="width: 100%;">
<tr>
  <td  style="width: 12%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Office Phone:</label></td>
<td style="width:20%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['office_phone'].'</td>
  <td  style="width: 18%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;"> Direct Line/Extension:</label></td>
<td style="width:20%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['direct_line'].'</td>
 <td  style="width: 10%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Office Fax:</label></td>
<td style="width: 20%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['office_fax'].'</td>
</tr>

</table>

<br/><br/>

<table style="width: 100%;">
<tr>
  <td  style="width: 21%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Office Contact Name/Title:</label></td>
<td style="width:30%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['office_contact_name'].'</td>
  <td  style="width:18%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Direct Line/Extension: </label></td>
<td style="width: 31%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['direct_line_2'].'</td>
</tr>
</table>

<br/><br/>

<table style="width: 100%;">
<tr>
  <td  style="width:10%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Cell Phone:</label></td>
<td style="width:41%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['cell_phone'].'</td>
  <td  style="width:6%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Email:</label></td>
<td style="width: 43%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['email'].'</td>
</tr>
</table>

<br/><br/>

<table style="width: 100%;">
<tr>
  <td  style="width: 23%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Corp/LLC/Partnership Name:</label></td>
<td style="width:32%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['partnership_name'].'</td>
  <td  style="width:17%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">DNB # (if applicable):</label></td>
<td style="width: 28%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['dnb'].'</td>
</tr>
</table>


<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 12%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Corp Address:</label></td>
<td style="width:43%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['corp_address'].'</td>
  <td  style="width: 5%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">City:</label></td>
<td style="width: 10%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['corp_city'].'</td>
  <td  style="width: 4%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">St:</label></td>
<td style="width: 11%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['corp_state'].'</td>
  <td  style="width: 5%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;"> ZIP:</label></td>
<td style="width: 10%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['corp_zip'].'</td>
</tr>
<tr>
<td colspan="8"><span style="margin: 0; padding: 0; font-size: 10px; color: #000;">(if different from above)</span></td>
</tr>

</table>

<br/><br/>

<table style="width: 100%;">
<tr>
  <td  style="width: 15%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Date Established:</label></td>
<td style="width:14%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['date_established'].'</td>
  <td  style="width: 27%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Average Gross Monthly Revenue:</label></td>
<td style="width:16%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['average_gross_monthly_revenue'].'</td>
 <td  style="width: 15%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Federal Tax ID#:</label></td>
<td style="width: 13%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['federal_tax_id'].'</td>
</tr>

</table>

<br/><br/>
 

<table style="width: 100%;">
<tr>
  <td  style="width: 20%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Principal owner\'s Name:</label></td>
<td style="width:18%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['principal_owner_name'].'</td>
  <td  style="width: 16%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Social Security No:</label></td>
<td style="width:17%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['social_security_no'].'</td>
 <td  style="width: 12%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Date of Birth:</label></td>
<td style="width: 17%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['date_of_birth'].'</td>
</tr>

</table>
<br/><br/>

<table style="width: 100%;">
<tr>
  <td  style="width: 13%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Home Address:</label></td>
<td style="width:42%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['home_address'].'</td>
  <td  style="width: 5%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">City:</label></td>
<td style="width: 10%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['home_city'].'</td>
  <td  style="width: 4%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">St:</label></td>
<td style="width: 11%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['home_state'].'</td>
  <td  style="width: 5%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;"> ZIP:</label></td>
<td style="width: 10%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['home_zip'].'</td>
</tr>
</table>
<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 25%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Principal Owner\'s Home Phone:</label></td>
<td style="width:30%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['home_phone'].'</td>
  <td  style="width: 18%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;"> Personal Cell Phone:</label></td>
<td style="width: 27%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['personal_cell_phone'].'</td>
</tr>

</table>

<table style="width: 100%;"><tr><td style="border-bottom: solid 4px #0f8be7">&nbsp;</td></tr></table>


<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 40%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Does site have a Med Tech identified to be hired?</label></td>
<td style="width:60%; font-size: 12px;"><input type="radio" name="box" value="1" readonly="true" />&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="box" value="1" readonly="true" />&nbsp;No</td>
 
</tr>

</table>
<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 100%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">If said Med Tech is known, please provide information below:</label></td>
 
</tr>

</table>

<br/><br/>

<table style="width: 100%;">
<tr>
  <td  style="width: 14%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Med Tech Name:</label></td>
<td style="width:24%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['med_tech_name'].'</td>
  <td  style="width: 7%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Phone:</label></td>
<td style="width:24%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['med_tech_phone'].'</td>
 <td  style="width: 7%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Email:</label></td>
<td style="width: 24%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['med_tech_email'].'</td>
</tr>
 
</table>
<table style="width: 100%;"><tr><td style="border-bottom: solid 4px #0f8be7">&nbsp;</td></tr></table>
<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 100%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;"> ** If Supervising MD Requirement Exists - Supervising MD Name/ Specialty:
</label></td>
 
</tr>

</table>
<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 20%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Supervising MD\'s Name:</label></td>
<td style="width:35%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['supervising_md_name'].'</td>
  <td  style="width:22%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Supervising MD\'s Specialty:</label></td>
<td style="width: 23%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['supervising_md_speciality'].'</td>
</tr>

</table>

<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 9%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Address: </label></td>
<td style="width:46%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['supervising_md_address'].'</td>
  <td  style="width: 5%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">City:</label></td>
<td style="width: 10%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['supervising_md_city'].'</td>
  <td  style="width: 4%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">St:</label></td>
<td style="width: 11%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['supervising_md_state'].'</td>
  <td  style="width: 5%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;"> ZIP:</label></td>
<td style="width: 10%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['supervising_md_zip'].'</td>
</tr>

</table>

<br/><br/>
<table style="width: 100%;">
<tr>
  <td  style="width: 13%;"><label style="margin: 0; padding: 0; font-size: 12px; color: #000;">Contact Phone:</label></td>
<td style="width:87%; border-bottom: solid 1px #000; font-size: 12px;">'.@$leasedata['supervising_md_phone'].'</td>
</tr>

</table>
<table style="width: 100%;"><tr><td style="border-bottom: solid 4px #0f8be7">&nbsp;</td></tr></table>
<br/><br/>

<table style="width: 100%;"><tr>
<td width="24%">&nbsp;</td>
<td style="text-align: left; font-size: 17px;" width="35%">Number of Devices Requested:</td>
<td style="border-bottom: solid 4px #0f8be7" width="17%">'.@$leasedata['no_of_devices_requested'].'</td>
<td width="24%">&nbsp;</td>
</tr></table>


<br/><br/>

<table style="width: 100%;"><tr>

<td style="text-align: left; font-size: 13px;" width="100%">By signing below, applicant authorizes Nex Medical Solutions, or its affiliated credit partners ("NMS") to run their credit report for the purpose of granting a lease for the NMS· 100 for their medical practice. Applicant represents and warrants that all credit and financial information submitted is true and correct and that NMS may use any information necessary pertaining to this application including, but not limited to owners, officers, or guarantors. The undersigned individual, recognizing that his or her individual credit history may be a factor in the evaluation of the applicant, as may be needed in the evaluation and review process and waives any right or claim they would otherwise have under the fair credit reporting act in the absence of this continuing consent.</td>

</tr></table>

<table style="width: 100%;">
<tr>
<td style="width: 30%; border-bottom: solid 1px #000; font-size: 12px;">&nbsp;</td>
<td width="40%">&nbsp;</td>
<td style="width: 30%; border-bottom: solid 1px #000; font-size: 12px;">&nbsp;</td>
</tr>

<tr>
<td style="width: 30%; color: #000; font-size: 12px;">Applicant Signature</td>
<td width="40%">&nbsp;</td>
<td style="width: 30%; color: #000; font-size: 12px;">Date</td>
</tr>


</table>

<br/><br/>

<table style="width: 100%;"><tr>

<td style="text-align: left; font-size: 13px;" width="100%">
<span style="text-align: center;">USA PATRIOT ACT NOTIFICATION - The following notification is being provided to you pursuant to Part 326 of the USA Patriot Act of 2001, 31 CFR 103.121(b)(5):
IMPORTANT INFORMATION ABOUT PROCEDURES FOR OPENING A NEW ACCOUNT</span>
<br/><br/>
To help the government fight the funding of terrorism and money laundering activities, Federal law requires all financial institutions to obtain, verify, and record information that identifies each person who opens an account.What this means for you: When you open an account, including any deposit account, loan, lease, or extension of credit, we will ask for your name, address, date of birth, and other information that will allow us to identify you. We may also ask to see your driver’s license or other identifying documents.
<br/><br/>
ECOA Notice
If your application for business credit is denied, you have the right to a written statement of the specific reasons for the denial. To obtain the statement, please contact Credit Disclosure Administrator, Crestmark Equipment Finance, Inc., 40950 Woodward Avenue, Suite 201, Bloomfield Hills, MI 48304, phone (248) 593-3900, within 60 days from the date you are notified of our decision. We will send you a written statement of reasons for the denial within 30 days of receiving your request for the statement. The Federal Equal Credit Opportunity Act prohibits creditors from discriminating against credit applicants on the basis of race, color, religion, national origin, sex, marital status, age (provided the applicant has the capacity to enter into a binding contract); because all or part of the applicant’s income derives from any public assistance program; or because the applicant has in good faith exercised any right under the Consumer Credit Protection Act. The federal agency that administers compliance with this law concerning this creditor is the Division of Compliance and Consumer Affairs, Federal Deposit Insurance Corporation, 300 South Riverside Plaza, Ste. 1700, Chicago, IL 60606.


</td>

</tr></table>

';

// output the HTML content
$pdf->SetFont('helvetica');
//$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/proxima-nova-58819d70abdee-webfont.woff', 'TrueTypeUnicode', '', 96);
//$pdf->SetFont($fontname, '', 30, '', false);

$pdf->SetY(5);
//$pdf->writeHTML($html1, true, 0, true, true);
$pdf->writeHTML($html, true, false, true, false, '');

$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
//$pdf->Output('laform.pdf', 'I');
$pdf->Output('laform'.rand(1000,9999).'.pdf', 'D');

//============================================================+
// END OF FILE
//============================================================+
