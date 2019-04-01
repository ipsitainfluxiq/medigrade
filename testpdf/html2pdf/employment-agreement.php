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
if( $_SERVER['HTTP_REFERER']!='http://localhost:4200/' && $_SERVER['HTTP_REFERER']!='https://greenvalleyportal.com/'){
  header('Location: '.'https://greenvalleyportal.com/');
  exit;

}
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

$pdf->SetLeftMargin(15);
$pdf->SetRightMargin(15);

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
    CURLOPT_URL => "http://greenvalleyportal.com:3020/getcontractdetailsforpdf?id=".$id,
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
print_r(($result));
echo "</pre>";*/
/*echo $result->time;
echo '<br/>';
echo date('m/d/Y', $result->time);
echo '<br/>';*/


$curl1 = curl_init();
curl_setopt_array($curl1, array(
    CURLOPT_URL => "http://greenvalleyportal.com:3020/getuserdetailsforpdf?id=".$id,
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


/*echo "<pre>";
print_r(($result1));
echo "</pre>";
exit;*/
    if ($result1->mastergroupid == '5b67d9e8c21db354218fe5b2' || $result1->mastergroupid == '5b67febbc21db354218fe5ba' || $result1->mastergroupid == '5b680104c21db354218fe5bc' || $result1->mastergroupid == '5b6802bb1d269c0632876861'|| $result1->mastergroupid == '0'|| $result1->mastergroupid == '5b83bf415be7d22242900ef3') {
        $mastergrouptype = 'non_imo';
        $mastergrouptype = 'non_imo';
        if($result1->mastergroupid==0 || $result1->mastergroupid=='5b83bf415be7d22242900ef3') $mval=0;
        else $mval=300;
    }
    else if ($result1->mastergroupid == '5b6803601d269c0632876862' || $result1->mastergroupid == '5b68021b1d269c0632876860' || $result1->mastergroupid == '5b67ffdec21db354218fe5bb' || $result1->mastergroupid == '5b655bc720ae416d1d0fb07f') {
        $mastergrouptype = 'call_center';
    }

   /* echo $mastergrouptype;
    exit;*/

$html = '
<table style="width: 100%; padding: 25px 0 10px 0;">
<tr>
<td><div style=" text-align: center;"></div></td>
</tr>
</table>  

<table style="width: 100%; padding: 10px 0; background-color: #1C83B4;">
<tr>
<td style="text-align: center;  vertical-align: middle;">
<table style="width: 100%;">
<tr>
<td style="text-align: center; width: 2%;">&nbsp; </td>
<td style="text-align: left;  background-color: #295b73 ; width: 12%;"> <img src="training_page_iconpdf.png" alt="#" style="margin-top: 20px;"> </td>
<td style="text-align: left; vertical-align: middle; background-color: #295b73 ; width:84%;   
    color: #fefefe;text-transform: uppercase;"><h1 style="font-size: 21px; line-height:32px;"><!--PART TIME EMPLOYMENT AGREEMENT -->PATIENT ADVOCATE EMPLOYEE LEASING PT EMPLOYMENT AGREEMENT GREEN VALLEY</h1></td>
<td style="text-align: center; width: 2%;">&nbsp; </td>
</tr>

</table>
        

    </td>
  </tr>
 
</table>


 <p style="font-size: 14px; color: #353535; line-height: 20px;"><!--This Agreement, (the “Agreement”), is made on the-->This Agreement, (the “Agreement”), is made on the <span style="background-color: #fffc00;"><u ><!--21st day of January, 2018-->'./*date('m/d/Y', $result->time)*/date('d',intval($result->time/1000)).' day of '.date('M, Y',intval($result->time/1000)).'</u>,</span>  by and between Employ Health Resources, LLC (hereafter known as “EHR”) as the employee leasing policy holding company and the representative brand owned by EHR, Green Valley Health, LLC (hereafter known as GVH) and both will be collectively known within this agreement as (“Employer”). Both are New York limited liability companies, the address of 722 Weiland Road Rochester NY 14626, and <span style="background-color: #fffc00;"><u >'.$result1->firstname.' '.$result1->lastname.'</u></span> (Employee). The parties have negotiated certain terms of the Employee’s part-time employment with the Employer and have come to certain understandings about the terms and conditions of employment and wish to evidence this in writing. </p>
 <p style="font-size: 18px; color: #295b73; line-height: 20px;">RECITALS</p>
  <p style="font-size: 14px; color: #353535; line-height: 20px;"><!--WHEREAS, Employer operates or intends to operate a clinical laboratory which provides quality laboratory services to health care providers for the testing of clinical specimens for toxicology, blood, PGX, and other clinical  services, and;-->WHEREAS, Employer operates or intends to operate brand, sales and management agreements for clinical laboratories which provides quality services to health care providers for the testing of clinical specimens for CGX, Allergy, toxicology, blood, PGX, and other clinical services, and;
<br/><br/>
<!--WHEREAS, Employer desires to expand its business by informing and educating members of the medical community, and other interested parties about, among other things, the quality, competence and reliability of the clinical laboratory services which the Employer can provide to individuals in need of such services, and Employer desires to hire Employee, on a part-time basis, to assist Employer in this endeavor, and;-->
WHEREAS, Employer desires to expand its business by informing and educating concerning available at home tele-medicine focused laboratory specimen opportunities to qualified individuals, and other interested parties. To share with said individuals, among other things, the quality, competence and reliability of the clinical laboratory services which the Employer can provide to individuals in need of such services, and Employer desires to hire Employee, on a part-time basis, to assist Employer in this endeavor, and;
<br/><br/>
WHEREAS, Employee desires to accept such employment with Employer, and;
<br/><br/>
WHEREAS, the Parties to this Agreement desire to meet the requirements of all applicable laws, including 42 USC §1395nn, ("Stark Law"), and 42 USC §1320a-7b, ("Anti-kickback Law");
<br/><br/>
NOW, THEREFORE, in consideration of the premises and of the benefits to be derived from the mutual observance of the covenants in this agreement, the parties agree as follows:</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">I. RIGHT TO REPRESENT</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">The signing of this agreement gives you the singer the right to represent the Green Valley Health, LLC  brand and Lab services to the potential participants you have in your network. You can use the assigned brochures, diagrams, software services and training programs to educate yourself and those you feel are a fit for the Labs that are offered. This includes your ability to presentthe opportunity to present the options for insurance coverage for the Labs offered through Green Valley as well based on the Laboratory policies.  The Appendix A of this agreement shows the offered commission amount, once submitted, that will be available to you directly either through W2 employed status or 1099 contractor status. You understand that until you submit a Lab and receive your initial commission payment you are acting as a free agent with only the right to represent the brand.<br/></p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">II. EMPLOYEE LEASING AGREEMENT AND PAYROLL</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">The Employer agrees to represent the employee as the leasing agent from EHMG, the employee leasing and payroll service company to GVH, the brand laboratory Employer(s) for fulfilling the term employment agreement between the EHMG and the GVH partnering Laboratories.
<br/><br/>
A.      It is understood by employee that EHMG has agreements with one or more Laboratories that are all represented under or will in the future be represented under the GVH brand through a brand leasing agreement. Employee is agreeing through the signature of this part time employment agreement to allow EHMG to represent them as their employee leasing company and to allow this contract agreement to be subject to all the GVH Laboratory leasing agreements.
<br/><br/>
B.      It is understood by employee that the GVH brand leasing agreement includes terms for leased employees from EHMG. You will be subject to the term leasing arrangement that is set with each of the Laboratories and in such case that EHMG or said Laboratory ends the brand leasing term agreement, you understand that your employment, being subject through this leasing arrangement will be terminated and released back to EHMG.
<br/><br/>
C.      It is understood by employee that there will or may be one or several Laboratories that are contracted under the GVH brand leasing agreement that will be responsible to this part time employment agreement. it is understood that you may be “part time employed” by one or several of these Laboratories that are all under the brand leasing agreement with GVH.
<br/><br/>
D.      It is understood by employee that EHMG will be processing your employee paperwork and managing your payroll services through said GVH Laboratories, but the Laboratories, subject to the brand leasing agreement, are the actual paying employer, as such you may be “hired” and working for several of these Laboratories all under the same brand GVH, but may receive more than one payroll payment from each lab separately and will be required to have all official hiring paperwork submitted and will be official with each lab.
</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;"><!--I. PART-TIME EMPLOYMENT-->III. PART-TIME EMPLOYMENT</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;"><!--The Employer agrees to employ the Employee as a Sales Representative on a part-time basis to perform the duties described in Section III of this Agreement, and the Employee accepts such part-time employment upon all of the terms and conditions set forth in this Agreement.-->The Employer agrees to employ the Employee as a Sales Representative on a part-time basis, subject directly to each participating laboratory, to perform the duties described in Section V of this Agreement, and the Employee accepts such part-time employment upon all the terms and conditions set forth in this Agreement.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">IV. TERM</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">The Initial Term of part-time employment under this Agreement (the "Initial Term"), shall commence on the  <br/><span style="background-color: #fffc00;"><u >'.date('d',intval($result->time/1000)).' day of '.date('M, Y',intval($result->time/1000)).'</u></span> , (the “Effective Date”), and continue until the  <span style="background-color: #fffc00;"><u >'.date('d',strtotime('+ 365 day',intval($result->time/1000))).' day of '.date('M, Y',strtotime('+ 365 day',intval($result->time/1000))).'</u>,</span> unless terminated earlier as provided herein.  Following the expiration of the Initial Term, and subject to the provisions of Section X herein, (“Termination”), this Agreement shall be automatically renewed for additional successive twelve (12) month part-time employment terms, (“Successor Terms”), unless terminated by Employer or Employee by delivery of 30 days written notice at any time.  In the event that either party delivers such a notice, the period of Employee\'s part-time employment will expire on the thirtieth day following delivery of such notice, unless terminated earlier as provided herein.  Employee’s employment under this Agreement, during the Initial Term or any Successor Terms, regardless of the number thereof, shall be strictly as a part-time Employee.<br/>The entire period of Employee’s employment under this Agreement is referred to as the “Part-Time Employment Term”.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">V. DUTIES</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">A. During the Part-Time Employment Term, the Employee, as a Sales Representative for the Employer, shall devote substantial business efforts and time (on a part-time basis) to the effort to expand Employer\'s business by informing and educating concerning available at home tele-medicine focused laboratory specimen opportunities to qualified individuals, and other interested parties. To share with said individuals, among other things, the quality, competence and reliability of the clinical laboratory services which the Employer can provide to individuals in need of such services, and Employee agrees and promises to perform and discharge, well and faithfully, those duties for the conduct of the Employer’s business. The Employee agrees to perform, on a part-time basis, those duties necessary to meet the expectations and goals of the Employer as established from time to time by the Employer in consultation with the Employee.Moreover, the Employee will be responsible for the overall management of (i) assisting other reps within their commission group that are subject to the offering of service and sale directly supporting the education and clarification needed by the contact or client and (ii) marketing an array of laboratory services.
<br/><br/>
B.	Except as otherwise provided in this Agreement or the Employer’s policies as adopted by its Members, even though Employee may be engaged in other business activity or employment during the Part-Time Employment Term, (subject to the restrictions described in Section XI herein), the Employee shall not during the term of this Agreement be engaged in any other business activity or accept any other employment in competition with the existing or proposed business of the Employer, whether or not such business activity is pursued for gain, profit, or other pecuniary advantage, without prior approval of the Employer.
<br/><br/>
C.	Employee shall adhere to all applicable federal, state and local governmental laws, rules, and regulations including, but not limited to, 42 USC §1395nn, ("Stark Law"), and its implementing regulations, and 42 USC §1320a-7b, ("Anti-kickback Law"), and its implementing regulations.  Employee shall indemnify Employer, and hold Employer harmless from, any liability or damage, including but not limited to actual attorney fees and costs, incurred by Employer arising from Employee’s violation of any state or Federal law or regulation.   </p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">VI. COMPENSATION</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">Beginning with the Effective Date of this Agreement, the Employee shall receive compensation as described in <strong>Exhibit "A"</strong> attached hereto which shall be paid by Employer(s) in accordance with the Employer’s regular payroll practices and procedures and Employee shall receive an IRS Form W-2 from each commission paying Employer to reflect compensation paid under this Agreement.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">VII. MEDICARE AND MEDICAID COMMISSIONS PAID TO EMPLOYEE</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">The Medicare and Medicaid reimbursements that are qualified for commission payments to employee will be compensated under this employee agreement at 100% of all commission payments owed. All the commissions that are to be distributed from any CMS operated program will fall under the agreement herewith of your employment to the Greenvalley Health Lab(s) that are employing you.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">VIII. COMMERCIAL INSURANCE COMMISSIONS OWED UNDER 1099 SUPPLEMENTAL</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">All commercial insurance commissions that are owed will be paid out through the 1099 direct pay arrangement to either your personal dba, company or entity. As private payers do not require the W2 status and tax reporting for commissions owed all commercial insurance commissions will be paid directly to you through this payer medium. You must have a 1099 on file with us to participate in this payer model.  You acknowledge that under commercial payer commissions that you are aware that this 1099 contractor status must be maintained by you to receive commissions for commercial carriers. These will come as a separate payment directly from Greenvalley Health Heath, LLC and not from one of the Greenvalley Health Employer Labs that are employing you as an employee.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">IX. BENEFITS</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">Employee acknowledges that his or her employment with Employer is on a part time basis and Employee hereby waives the right to participate in any employee benefit plans of Employer.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">X. TERMINATION</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">A. This Agreement may be terminated by the Employee at any time.  When the Employer receives notice of Employee’s voluntary termination, the Employer may, at its sole discretion, immediately effect the voluntary termination of the Employee’s employment. Any voluntary termination of this Agreement by the Employee as described in this provision shall terminate the rights and obligations of each of the parties except as to those which survive the termination of this Agreement as described in Section XI (A) through (E), in Exhibit “A”, and in Section V (C) herein. 
<br/><br/>
B. Employee’s Employment with the Employer may be terminated only for cause.  “Cause” shall be defined as follows:  i) The Employee’s failure or refusal to comply with the policies, standards, or procedures established by Employer from time to time; ii) The Employee’s commission, or alleged commission, of acts of misconduct, or failure to comply with any material term or condition of this Agreement; iii) The Employee’s acceptance of employment by, or acquisition of an ownership interest in, or affiliation with, or upon Employee becoming an officer, director, or agent of any business that competes with Employer, direct or indirect; iv)  Employee’s arrest or indictment for a felony or activity involving fraud; v) Employer’s discovery that Employee is misusing any controlled substance; vi) Employee’s death or disability.  </p>
<p style="font-size: 18px; color: #295b73; line-height: 22px;">XI. CONFIDENTIALITY, NONSOLICITATION, NONCOMPETITION,<br/>INJUNCTIVE RELIEF</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">
A. <u>Unauthorized Disclosure of Confidential Information</u>. During Employee\'s Part-Time Employment Term, and continuing thereafter following any termination of such part-time employment, without the prior written consent of the Employer, except to the extent required by an order of a court having jurisdiction or under subpoena from an appropriate government agency (in which event, the Employee shall use his reasonable efforts to consult with the Employer prior to responding to any such order or subpoena), and except as required in the performance of his duties hereunder, the Employee shall not disclose or use for his benefit or gain any confidential or proprietary trade secrets, customer lists, information regarding business development, marketing plans, sales plans, management organization information, operating policies or manuals, business plans, financial records, or other financial, commercial, business or technical information (a) relating to the Employer or any of its Affiliates or (b) that the Employer or any of its Affiliates may receive belonging to suppliers, customers or others who do business with the Employer or any of its Affiliates (collectively, “Confidential Information”) to any third person unless such Confidential Information has been previously disclosed to the public or is in the public domain (other than by reason of the Employee’s breach of this Section XI). 
<br/><br/>
B. <u>Non-Competition</u>. During the period of the Employee\'s part-time employment with the Employer, and for three (3) years following termination thereof, irrespective of the reason for such termination, the Employee shall not, directly or indirectly, become employed in any capacity by, engage in business with, serve as an agent or consultant or a director, or become a partner, member, principal or stockholder of, any Person or entity (or help any third party commence, support or expand a commercial operation) that engages in, competes with, or has a reasonable potential for competing, with any part of the current or prospective business of the Employer or any of its Affiliates (the “Business”), nor shall Employee, directly or indirectly, provide, accept or offer to sell any clinical laboratory services, or any other services provided by the Employer, to any customer of Employer (or accept said services) which was Employer’s customer during the period of Employee’s employment with Employer, or during the period two (2) years before Employee’s employment with Employer, or upon whom Employee called as a prospective customer during Employee’s employment with Employer.
<br/><br/>
C. <u>Non-Solicitation of Employees and/or Employer’s Vendors</u>. During Employee’s employment and for three (3) years following termination thereof, irrespective of the reason for such termination, the Employee shall not, directly or indirectly, for his own account or for the account of any other Person or entity, (i) solicit for employment, employ or otherwise interfere with the relationship of the Employer or any of its Affiliates with any individual who is or was employed by, or with any vendor who provided services to, or was otherwise engaged to perform services for the Employer or any of its Affiliates in connection with the Business at any time during which the Employee was employed by the Employer, or (ii) induce any employee of the Employer or any of its Affiliates, or any vendor to Employee, to terminate his or her employment with, or terminate the services provided to, the Employer. 
<br/><br/>
D. <u>Return of Documents</u>. Upon termination of the Employee’s Employment for any reason, the Employee shall deliver to the Employer all of (i) the property of the Employer and (ii) the documents and data of any nature and in

            whatever medium of the Employer, and he shall not take with him any such property, documents or data or any reproduction thereof, or any documents containing or pertaining to any Confidential Information.
<br/><br/>
E. Employee acknowledges and agrees that the covenants, obligations and agreements of the Employee contained in Section XI relate to special, unique and extraordinary matters and that a violation of any of the terms of such covenants, obligations or agreements will cause the Employer irreparable injury for which adequate remedies are not available at law. Therefore, the Employee agrees that the Employer shall be entitled to an injunction, restraining order or such other equitable relief (without the requirement to post bond) as a court of competent jurisdiction may deem necessary or appropriate to restrain the Employee from committing any violation of such covenants, obligations or agreements. These injunctive remedies are cumulative and in addition to any other rights and remedies the Company may have and the provisions of this Section XI shall survive the termination of this Agreement.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">XII. ASSIGNMENT PROHIBITED</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">This Agreement is personal to each of the parties and neither party may assign or delegate any of its rights or obligations under this Agreement without first obtaining the other’s written consent.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">XIII. MISCELLANEOUS</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">A.	This Agreement contains all of the terms and conditions of the contractual relationship between the parties, and no amendments or additions to this Agreement shall be binding unless they are in writing and signed by both parties.
<br/><br/>
B.	This Agreement shall be binding upon the parties, their legal representatives, successors, and assigns.
<br/><br/>
C.	This Agreement abrogates and takes the place of all prior employment contracts and/or understandings that may have been made by the Employer.
<br/><br/>
D.	The captions or headings of this Agreement are for convenience only and in no way define, limit, or describe the scope or intent of this Agreement or any of its sections, nor do they in any way affect this Employment Agreement.
<br/><br/>
E.	The Employee shall comply with all reporting and recording requirements regarding compensation expenditures and benefits provided by the Employer under the U.S. Internal Revenue Code, as amended, and any of its rules and regulations.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">XIV. NOTICES</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">Any notice required or permitted to be given under this Agreement shall be sufficient if it is in writing and if it is sent by registered mail or certified mail, return receipt requested, to the Employee at his residence or to the Employer at its principal place of business, Attention: Managing Member, or the officer or address that the Employer shall provide the Employee.</p>
<p style="font-size: 18px; color: #295b73; line-height: 20px;">XV. COUNTERPART SIGNATURES</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">This Agreement may be executed in one or more counterparts, each of which shall be considered an original instrument, but all of which taken together shall be considered one and the same agreement and which shall become effective when one or more counterparts have been signed by each of the parties hereto and delivered to the other.  Original signatures transmitted by facsimile or .pdf shall be sufficient and binding upon the parties hereto.</p>

<p style="font-size: 18px; color: #295b73; line-height: 20px;">XVI. GOVERNING LAW</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of New York.</p>

<p style="font-size: 18px; color: #295b73; line-height: 20px;">XVII. SEVERABILITY</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">The invalidity of all or any part of any sections, subsections, or paragraphs of this Agreement shall not invalidate the remainder of this Agreement or the remainder of any paragraph or section not invalidated unless the elimination of such subsections, sections, or paragraphs shall substantially defeat the intents and purposes of the parties.</p>
<p style="font-size: 16px; color: #426a7f; line-height: 20px;">WHEREFORE, the parties have executed this Agreement on the date listed on the first page of this Agreement.</p>';
$html2='
<p style="font-size: 18px; color: #295b73; line-height: 20px;">EMPLOYEE</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">'.$result1->firstname.' '.$result1->lastname.'</p>
<p style="font-size: 14px; color: #353535;  line-height: 20px;">/s/</p>


';

$html3='<table style="font-size:36px; color: #353535;  border-bottom: solid 1px #4b4b4b; width: 260px;"><tr><td>'.$result->name.'</td></tr></table> ';


/*$html4_old dispaly none='
<div style="width: 1px;  border-left: dotted 1px #d5d6d6;"><br/><br/><br/><br/><br/><br/><br/><br/></div>
';*/

$html5='<p style="font-size: 18px; color: #295b73; line-height: 20px; width: 320px;">EMPLOYER</p>
<p style="font-size: 14px; color: #353535; line-height: 20px;">Employee Health Management Group, LLC <br/>Greenvalley Health, LLC</p>

<p style="font-size: 14px; color: #353535;  line-height: 20px;">By: /s/</p>';

$html6='<table style="font-size:36px; color: #353535;  width: 280px;"><tr><td style=" border-bottom: solid 1px #4b4b4b; line-height: 10px;"><img src="pdf_sign.png" style="width: 150px;"></td></tr></table> ';
$html4='
<p style="font-size: 14px; color: #353535;">By: John Picarreto<br/>Its: Chief Executive Officer</p>';




if($mastergrouptype=='non_imo') {

    $html7 = '

<!-------------part 1------------------->

<table style="width: 100%; padding: 5px 0 0px 0;">
<tr><td style="border-bottom: solid 1px #d5d6d6;">&nbsp;</td></tr>
</table>  

<p style="font-size: 18px; color: #295b73; line-height: 20px;">EXHIBIT "A"</p>
<p style="font-size: 14px; color: #058aca; line-height: 18px;"><strong><u>COMPENSATION</u></strong></p>
<p style="font-size: 14px; color: #426a7f; line-height: 18px;"><strong>PER SAMPLE FEE</strong></p>
<p style="font-size: 14px; color: #353535; line-height: 18px;">Employee compensation shall become due from, and be payable by, Employer only upon</p>

<p style="font-size: 14px; color: #353535; line-height: 18px;">(a)    employer’s receipt of reimbursement for CGX or any future lab service offerings such as quantitative urine, PGX, allergy or wellness blood sample(s)<br/><br/>
(b)   those sample(s) reimbursed at, or above, Medicare’s standard rate - whether Medicare or non-Medicare sample(s), and;
<br/><br/>
(c)    procured by Employee. </p>


<p style="font-size: 14px; color: #353535; line-height: 20px;">Employer shall not be obligated to pay more than one fee per each sample, and Employee shall be required to refund to Employer any fee paid to Employee on sample(s) for which reimbursement is later denied or recovered by any Insurance Payor. Additionally, Compensation may be adjusted upon any declining Medicare reimbursement rates, or reimbursements equating to 10% less of the estimated amount allowed for Medicare.</p>

<p style="font-size: 14px; color: #353535; line-height: 28px; display: block; ">Laboratory Services</p>

<table width="100%;">
<tr>
<td style="width: 30px; line-height: 20px;"><img src="libg2.jpg" alt="#" ></td>
<td style="width: 190px;"><p style="font-size: 14px; line-height: 20px; color: #353535;">CGX Exam:</p></td>
<td style=" border-bottom: solid 1px #4b4b4b; width: 160px;">$'.$mval.'<!-- . $result->compensationgrade . --></td>

</tr>
</table>
<br/><br/>
<table width="100%;">
<tr>
<td style="width: 30px; line-height: 20px;"><img src="libg2.jpg" alt="#" ></td>
<td style="width: 190px;"><p style="font-size: 14px; line-height: 20px; color: #353535;">PGX Exam: </p></td>
<td style=" border-bottom: solid 1px #4b4b4b; width: 160px;">$TBD<!-- . $result->pgxvalue . --></td>

</tr>

</table>
<br/><br/>
<table width="100%;">
<tr>
<td style="width: 30px; line-height: 20px;"><img src="libg2.jpg" alt="#" ></td>
<td style="width: 190px;"><p style="font-size: 14px; line-height: 20px; color: #353535;">Wellness Blood Panel Exam: </p></td>
<td style=" border-bottom: solid 1px #4b4b4b; width: 160px;">$TBD</td>

</tr>

</table>
<br/><br/>
<table width="100%;">
<tr>
<td style="width: 30px; line-height: 20px;"><img src="libg2.jpg" alt="#" ></td>
<td style="width: 190px;"><p style="font-size: 14px; line-height: 20px; color: #353535;"> Allergy: </p></td>
<td style=" border-bottom: solid 1px #4b4b4b; width: 160px;">$TBD</td>

</tr>

</table>


<p style="font-size: 14px; color: #353535; line-height: 20px;">Employee shall have full access always to all billing and receivable data pertaining to clientele procured by Employee. If this agreement is terminated by either the Employee for voluntary purposes or by Employer for cause as described in Section X (A) and (B), Employee shall continue to receive compensation according to the per sample arrangement for a period of no less than two pay cycles from the date of the termination.

 <br/><br/>

In the event of death or disability, Employee shall have all residual commissions paid in perpetuity to designated assignee (spouse or child) or estate upon death for a period of no less than the remaining time of the contract in force with Employer.

 
<br/><br/>
 

If Employee elects to introduce no less than five (5) other employees to Employer, and cooperatively operates in a senior sales capacity of said employees, Employee may receive “overrides” for consideration of his or her management of such other employees, and their compensation may be shared as overrides to the Employee provided, however, that the Employee effectively manages such sales teams that shall be actively and diligently working to further the business of Employer pursuant to a written employment agreement.  Therefore, the Employee shall mentor employees in a sales capacity; thereby enabling the Employee an override in the following amounts ($50 override for any direct report and $25 for secondary direct reports) in earned commissions from said other employees that may be introduced in the future.  Upper Management will continue to oversee this mentoring program to ensure best practices, appropriate oversight and support is being adhered to.
</p>
';
}
else {
    $html7='

<!-------------part 2------------------->
<table style="width: 100%; padding: 5px 0 0px 0;">
<tr><td style="border-bottom: solid 1px #d5d6d6;">&nbsp;</td></tr>
</table>  

<p style="font-size: 18px; color: #295b73; line-height: 20px;">EXHIBIT "A"</p>
<p style="font-size: 14px; color: #058aca; line-height: 18px;"><strong><u>COMPENSATION</u></strong></p>
<p style="font-size: 14px; color: #426a7f; line-height: 18px;"><strong>PER SAMPLE FEE</strong></p>
<p style="font-size: 14px; color: #353535; line-height: 18px;">Employee compensation shall become due from, and be payable by, Employer only upon</p>

<p style="font-size: 14px; color: #353535; line-height: 18px;">(a)    employer’s receipt of reimbursement for CGX or any future lab service offerings such as quantitative urine, PGX, allergy or wellness blood sample(s)
<br/><br/>
(b)   those sample(s) reimbursed at, or above, Medicare’s standard rate - whether Medicare or non-Medicare sample(s), and;

<br/><br/>
(c)    procured by Employee.  </p>


<p style="font-size: 14px; color: #353535; line-height: 20px;">Employer shall not be obligated to pay more than one fee per each sample, and Employee shall be required to refund to Employer any fee paid to Employee on sample(s) for which reimbursement is later denied or recovered by any Insurance Payor. Additionally, Compensation may be adjusted upon any declining Medicare reimbursement rates, or reimbursements equating to 10% less of the estimated amount allowed for Medicare.
</p>

<p style="font-size: 14px; color: #353535; line-height: 28px; display: block; ">Laboratory Services</p>

<table width="100%;">
<tr>
<td style="width: 30px; line-height: 20px;"><img src="libg2.jpg" alt="#" ></td>
<td style="width: 190px;"><p style="font-size: 14px; line-height: 20px; color: #353535;">CGX Exam:</p></td>
<td style=" border-bottom: solid 1px #4b4b4b; width: 160px;">$200<!-- . $result->compensationgrade . --></td>

</tr>
</table>
<br/><br/>
<table width="100%;">
<tr>
<td style="width: 30px; line-height: 20px;"><img src="libg2.jpg" alt="#" ></td>
<td style="width: 190px;"><p style="font-size: 14px; line-height: 20px; color: #353535;">PGX Exam: </p></td>
<td style=" border-bottom: solid 1px #4b4b4b; width: 160px;">$TBD<!-- . $result->pgxvalue . --></td>

</tr>

</table>
<br/><br/>
<table width="100%;">
<tr>
<td style="width: 30px; line-height: 20px;"><img src="libg2.jpg" alt="#" ></td>
<td style="width: 190px;"><p style="font-size: 14px; line-height: 20px; color: #353535;">Wellness Blood Panel Exam: </p></td>
<td style=" border-bottom: solid 1px #4b4b4b; width: 160px;">$TBD</td>

</tr>

</table>
<br/><br/>
<table width="100%;">
<tr>
<td style="width: 30px; line-height: 20px;"><img src="libg2.jpg" alt="#" ></td>
<td style="width: 190px;"><p style="font-size: 14px; line-height: 20px; color: #353535;"> Allergy: </p></td>
<td style=" border-bottom: solid 1px #4b4b4b; width: 160px;">$TBD</td>

</tr>

</table>


<p style="font-size: 14px; color: #353535; line-height: 20px;">Employee shall have full access always to all billing and receivable data pertaining to clientele procured by Employee. If this agreement is terminated by either the Employee for voluntary purposes or by Employer for cause as described in Section X (A) and (B), Employee shall continue to receive compensation according to the per sample arrangement for a period of no less than two pay cycles from the date of the termination.

 <br/><br/>

In the event of death or disability, Employee shall have all residual commissions paid in perpetuity to designated assignee (spouse or child) or estate upon death for a period of no less than the remaining time of the contract in force with Employer.

 

 <br/><br/>

If Employee elects to introduce no less than five (5) other employees to Employer, and cooperatively operates in a senior sales capacity of said employees, Employee may receive “overrides” for consideration of his or her management of such other employees, and their compensation may be shared as overrides to the Employee provided, however, that the Employee effectively manages such sales teams that shall be actively and diligently working to further the business of Employer pursuant to a written employment agreement.  Therefore, the Employee shall mentor employees in a sales capacity; thereby enabling the Employee an override in the following amounts ($50 override for any direct report and $25 for secondary direct reports) in earned commissions from said other employees that may be introduced in the future.  Upper Management will continue to oversee this mentoring program to ensure best practices, appropriate oversight and support is being adhered to.

</p>


';
}
/*$html3 ='






';*/

// output the HTML content
$pdf->SetY(0);
//$pdf->SetX(0);
//$pdf->writeHTML($html.$html2.$html3, true, 0, true, true);
//$pdf->writeHTML($html, true, false, true, false, '');



//$pdf->SetFont('helvetica');
$pdf->writeHTML($html, true, false, true, false, '');

$pdf->SetLeftMargin(15);
$pdf->SetY(280);
$pdf->writeHTML($html2, true, false, true, false, '');

$pdf->SetY(42);
$pdf->SetLeftMargin(21);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->writeHTML($html3, true, false, true, false, '');

$pdf->SetFont('helvetica');
$pdf->SetLeftMargin(106);
$pdf->SetY(70);
$pdf->writeHTML($html4, true, false, true, false, '');


$pdf->SetLeftMargin(106);
$pdf->SetY(27);
$pdf->writeHTML($html5, true, false, true, false, '');


$pdf->SetLeftMargin(118);
$pdf->SetY(53);
$pdf->SetFont('Notera_PersonalUseOnly');
$pdf->writeHTML($html6, true, false, true, false, '');


$pdf->SetLeftMargin(15);
$pdf->SetY(80);
$pdf->SetFont('helvetica');
$pdf->writeHTML($html7, true, false, true, false, '');

$pdf->SetLeftMargin(15);
$pdf->SetY(270);
$pdf->writeHTML($html8, true, false, true, false, '');

$pdf->SetLeftMargin(8);
$pdf->SetY(70);
$pdf->writeHTML($html9, true, false, true, false, '');

$pdf->SetLeftMargin(15);
$pdf->SetY(112);
$pdf->writeHTML($html10, true, false, true, false, '');

$pdf->SetLeftMargin(8);
$pdf->SetFont('helvetica');
$pdf->SetY(160);
$pdf->writeHTML($html11, true, false, true, false, '');

/*$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '', 30);

$pdf->SetFont($fontname, '', 25, '', false);
$pdf->writeHTML($html2, true, 0, true, true);

//$pdf->SetFont('helvetica');
$pdf->writeHTML($html3, true, false, true, false, '');*/

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('employment-agreement.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
