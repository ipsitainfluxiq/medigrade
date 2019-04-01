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

if(isset($_GET['contract_id'])){
    $contract_id = $_GET['contract_id'];
    $contract_id = base64_decode(base64_decode($contract_id));
    $salesrep = $AI->db->GetAll("SELECT * FROM rep_contract WHERE id = ".db_in($contract_id));
    if(count($salesrep)) {
        $salesrep = $salesrep[0];
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
        $this->SetY(-26);
        //$this->SetX(-18);
        // Set font
        $this->SetFont('times', 12);

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

$pdf->SetLeftMargin(20);
$pdf->SetRightMargin(20);

$pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);


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
$pdf->SetFont('times');



// add a page
$pdf->AddPage();

// create some HTML content
/*$html = '<h1>Example of HTML text flow</h1>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. <em>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</em> <em>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</em><br /><br /><b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i><br /><br /><b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u>';*/


$html1 = '<h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0;"><u>PART TIME EMPLOYMENT AGREEMENT</u><br/></h2><br/><br/><br/><div style="line-height:19px; font-size: 14px; color: #000000; ">This Agreement, (the "Agreement"), is made on the <u>'.@$salesrep['cdate'].'</u> day of <u>'.@$salesrep['cmonth'].'</u>, 2017, by and between Nex Medical Solutions, LLC, a Michigan limited liability company, with an address of 610 West Congress, Detroit, MI 48226 ("<strong>Employer</strong>"), and <u>'.@$salesrep['salesrepname'].'</u>, with an address of <u>'.@$salesrep['salesrepaddress'].'</u> ("<strong>Employee</strong>"). (The Employer and Employee collectively shall be referred to as “Parties” and individually as "Party"). The Parties have negotiated certain terms of the Employee’s part-time employment with the Employer and have come to certain understandings about the terms and conditions of employment and wish to evidence this in writing.</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">RECITALS</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHEREAS, Employer is engaged in the business of providing, directly or through affiliated entities, certain medical devices and medical device services to health care providers and facilities for the purpose of clinical testing of ANS/autonomic nervous system, and;</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHEREAS, Employer desires to expand its business by informing and educating members of the medical community, and other interested parties about, among other things, the benefits of the clinical ANS services which the Employer can provide to individuals in need of such services, and Employer desires to hire Employee, on a part-time basis, to assist Employer in this endeavor, and;</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHEREAS, Employee desires to accept such employment with Employer, and;</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHEREAS, the Parties to this Agreement desire to meet the requirements of all applicable laws, including 42 USC §1395nn, ("Stark Law"), and 42 USC §1320a-7b, ("Anti-kickback Law");</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOW, THEREFORE, in consideration of the premises and of the benefits to be derived from the mutual observance of the covenants in this agreement, the Parties agree as follows:</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">I. PART-TIME EMPLOYMENT</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Employer agrees to employ the Employee as a Sales Representative on a part-time basis to perform the duties described in Section III of this Agreement, and the Employee accepts such part-time employment upon all of the terms and conditions set forth in this Agreement.</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">II. TERM</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The Initial Term of part-time employment under this Agreement (the "<strong>Initial Term</strong>"), shall commence on the <u>'.@$salesrep['termsdate'].'</u> day of <u>'.@$salesrep['termsmonth'].'</u>, 2017, (the "<strong>Effective Date</strong>"), and continue until the <u>'.@$salesrep['termedate'].'</u> day of <u>'.@$salesrep['termemonth'].'</u> , 2019, unless terminated earlier as provided herein.  </div><div style="line-height:19px; font-size: 14px; color: #000000; "><br/><br/>Following the expiration of the Initial Term, and subject to the provisions of Section VI herein, (“<strong>Termination</strong>”), this Agreement shall be automatically renewed for additional successive twelve (12) month part-time employment terms, (“<strong>Successor Terms</strong>”),unless terminated by Employer or Employee by delivery of 30 days written notice at any time.  In the event that either Party delivers such a notice, the period of Employee\'s part-time will expire on the thirtieth day following delivery of such notice, unless terminated earlier as provided herein.  Employee’s employment under this Agreement, during the Initial Term or any Successor Terms, regardless of the number thereof, shall be strictly as a part-time Employee.  The entire period of Employee’s employment under this Agreement is referred to as the “<strong>Part-Time Employment Term</strong>”.</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">III. DUTIES</h2><div style="line-height:19px; font-size: 14px; color: #000000; "><ol style="list-style-type: upper-alpha; list-style-position: outside; margin: 0; padding: 0;"><li style="margin: 20px 0 0 0; padding: 0px 0 0 40px!important; ">During the Part-Time Employment Term, the Employee, as a Sales Representative for the Employer, shall devote substantial business efforts and time (on a part-time basis) to the effort to expand Employer\'s business by informing and educating members of the medical community, and other interested parties about, among other things, the benefits of the clinical ANS services which the Employer can provide to individuals in need of such services, and Employee agrees and promises to perform and discharge, well and faithfully, those duties and such other duties as may be assigned to him or her from time to time by the Employer for the conduct of the Employer’s business. The Employee agrees to perform, on a part-time basis, those duties necessary to meet the expectations and goals of the Employer as established from time to time by the Employer in consultation with the Employee.</li><br/><li style="margin: 20px 0 0 0; padding: 0px 0 0 40px!important; ">Except as otherwise provided in this Agreement or the Employer’s policies as adopted, even though Employee may be engaged in other business activity or employment during the Part-Time Employment Term,(subject to the restrictions described in Section VII herein), the Employee shall not during the Part-Time Employment Term of this Agreement be engaged in any other business activity or accept any other employment in competition with the existing or proposed business of the Employer, whether or not such business activity is pursued for gain, profit, or other pecuniary advantage, without prior approval of the Employer. </li><br/><li style="margin: 20px 0 0 0;padding: 0px 0 0 40px!important; ">Employee shall adhere to all applicable federal, state and local governmental laws, rules, and regulations including, but not limited to, 42 USC §1395nn, ("Stark Law"), and its implementing regulations, and 42 USC §1320a-7b, ("Anti-kickback Law"), and its implementing regulations.Employee shall indemnify Employer, and hold Employer harmless from, any liability or damage, including but not limited to actual attorney fees and costs, incurred by Employer arising from Employee’s violation of any state or Federal law or regulation.</li></ol></div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">IV. COMPENSATION</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beginning with the Effective Date of this Agreement, the Employee shall receive compensation as described in
<strong>Exhibit "A"</strong> attached hereto which shall be paid by Employer in accordance with the Employer’s regular payroll practices and procedures and Employee shall receive an IRS Form W-2 from Employer to reflect compensation paid under this Agreement.</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">V. BENEFITS</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Employee acknowledges that his or her employment with Employer is on a part time basis and Employee hereby waives the right to participate in any employee benefit plans of Employer.</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">VI. TERMINATION  </h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A.  This Agreement may be terminated by the Employee at any time. When the Employer

receives notice of Employee’s voluntary termination, the Employer may, at its sole discretion,

immediately effect the voluntary termination of the Employee’s employment. Any voluntary

termination of this Agreement by the Employee as described in this provision shall terminate the

rights and obligations of each of the Parties except as to those which survive the termination of

this Agreement as described in Section VII (A) through (E), Exhibit A, and in Section III (C)

herein.</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B.  Employee’s employment with the Employer shall be “at will,” meaning that Employer shall be entitled to terminate Employee at any time and for any reason, or for no reason, with or without Cause. Any contrary representations that may have been made to the Employee shall be superseded by this Agreement. This Agreement shall constitute the full and complete agreement between the Employee and the Employer on the “at will” nature of the Employee’s employment, which may only be changed in an express written agreement signed by an authorized Member of the Employer.</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">VII. CONFIDENTIALITY, NONSOLICITATION, NONCOMPETITION,<br/> INJUNCTIVE RELIEF</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A.&nbsp;&nbsp;<u>Unauthorized Disclosureof Confidential Information.</u> During Employee\'s Part-Time Employment Term, and continuing thereafter following any termination of such part-time employment, without the prior written consent of the Employer, except to the extent required by an order of a court having jurisdiction or under subpoena from an appropriate government agency (in which event, the Employee shall use his or her reasonable efforts to consult with the Employer prior to responding to any such order or subpoena), and except as required in the performance of his or her duties hereunder, the Employee shall not disclose or use for his or her benefit or gain any confidential or proprietary trade secrets, customer lists, vendors or manufactures, information regarding business development, marketing plans, sales plans and presentations, management organization information, operating policies or manuals,business plans, financial records, or other financial, commercial, business or technical information (a) relating to the Employer or any of its affiliates or (b) that the Employer or any of its affiliates may receive belonging to suppliers, customers or others who do business with the Employer or any of its affiliates (collectively, “Confidential Information”) to any third person unless such Confidential Information has been previously disclosed to the public or is in the public domain (other than by reason of the Employee’s breach of this Section VII).</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B.&nbsp;&nbsp;<u>Non-Competition</u>. During the period of the Employee\'s part-time employment with the Employer, and for two (2) years following termination thereof, irrespective of the reason for such termination, the Employee shall not, directly or indirectly, become employed or contracted in any capacity by, engage in business with, serve as an agent or consultant or a director, or become a partner, member, principal or stockholder of, any person or entity that competes or has a reasonable potential for competing, with any part of the current or prospective business of the Employer or any of its affiliates (the “Business”), nor shall Employee, directly or indirectly, provide, acceptor offer to sell any clinical ANS services to any customer of Employer (or accept said services) which was Employer’s customer during the period of Employee’s employment with Employer,or before Employee’s employment with Employer, or upon whom Employee called as a prospective customer during Employee’s employment with Employer.</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;C.&nbsp;&nbsp;<u>Non-Solicitation of Employees and/or Employer’s Vendors, Distributors or Manufactures</u>. During Employee’s employment and for two (2) years following termination thereof, irrespective of the reason for such termination, the Employee shall not, directly or indirectly, for his or her own account or for the account of any other person or entity, (i) solicit for employment, employ or otherwise interfere with the relationship of the Employer or any of its affiliates with any individual who is or was employed by, or with any vendor, distributor or manufacture who provided services or technology to, or was otherwise engaged to provide services or technology for the Employer or any of its affiliates in connection with the Business at any time during which the Employee was employed by the Employer, or (ii) induce any employee of the Employer or any of its affiliates, or any vendor, distributor or manufacture to Employer, to terminate his or her employment with, or terminate the services provided to, the Employer.</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;D.&nbsp;&nbsp;<u>Return of Documents</u>. Upon termination of the Employee’s Employment for any reason, the Employee shall deliver to the Employer all of (i) the property of the Employer and (ii) the documents and data of any nature and in whatever medium of the Employer, and he or she shall not take with him or her any such property, documents or data or any reproduction thereof, or any documents containing or pertaining to any Confidential Information.</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;E.&nbsp;&nbsp;Employee acknowledges and agrees that the covenants, obligations and agreements of the Employee contained in Section VII relate to special, unique and extraordinary matters and that a violation of any of the terms of such covenants, obligations or agreements will cause the Employer irreparable injury for which adequate remedies are not available at law. Therefore, the Employee agrees that the Employer shall be entitled to an injunction, restraining order or such other equitable relief (without the requirement to post bond) as a court of competent jurisdiction may deem necessary or appropriate to restrain the Employee from committing any violation of such covenants, obligations or agreements. These injunctive remedies are cumulative and in addition to any other rights and remedies the Company may have and the provisions of this Section VII shall survive the termination of this Agreement, irrespective of the reason for termination.</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">VIII. ASSIGNMENT PROHIBITED</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This Agreement and its rights and interests hereunder may be assignable by Employer without the Employee’s consent, but Employee shall not assign this Agreement or its rights and interests hereunder, without the prior written consent of the Employer.<br/><br/></div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">IX. MISCELLANEOUS</h2><ol style="list-style-type: upper-alpha; list-style-position: outside; margin: 0; padding: 0;"><li>This Agreement contains all of the terms and conditions of the contractual relationship between the Parties, and no amendments or additions to this Agreement shall be binding  unless they are in writing and signed by both Parties.<br/></li><li>This Agreement shall be binding upon the Parties, their legal representatives, successors, and assigns.<br/></li><li>This Agreement abrogates and takes the place of all prior employment contracts and/or understandings that may have been made by the Employer.<br/></li><li>The captions or headings of this Agreement are for convenience only and in no way define, limit, or describe the scope or intent of this Agreement or any of its sections, nor do they in any way affect this Agreement.<br/></li><li>The Employee shall comply with all reporting and recording requirements regarding compensation expenditures and benefits provided by the Employer under the U.S. Internal Revenue Code, as amended, and any of its rules and regulations.<br/></li><li>The Parties agree this Agreement is based on the intention and assumption its terms and conditions are fully compliant with state and federal regulations, and will therefore immediately adopt any revisions necessary to remain compliant, and amend this Agreement, accordingly.<br/></li><li> Employee shall not cast any disparaging statement(s) against the Employer, during or after the Part-Time Employment Term.<br/></li><li>Employee shall not make any misrepresentati ons connected to the Employer, medical device or medical device services hereunder. </li></ol><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">X. NOTICES</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Any notice required or permitted to be given under this Agreement shall be sufficient if it is in writing and if it is sent by registered mail or certified mail, return receipt requested, to the Employee at his or her residence affixed above, or to the Employer’s principal place of business as affixed above</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">XI. COUNTERPART SIGNATURES</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This Agreement may be executed in one or more counterparts, each of which shall be considered an original instrument, but all of which taken together shall be considered one and the same agreement and which shall become effective when one or more counterparts have been signed by each of the Parties hereto and delivered to the other.  Original signatures transmitted by facsimile or .pdf shall be sufficient and binding upon the Parties hereto.<br/></div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">XII. GOVERNING LAW</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This Agreement shall be governed by, construed, and enforced in accordance with the laws of the State of Michigan, and venue in the courts of Wayne County, Michigan.</div><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight:normal;">XIII. SEVERABILITY</h2><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The invalidity of all or any part of any sections, subsections, or paragraphs of this Agreement shall not invalidate the remainder of this Agreement or the remainder of any paragraph or section not invalidated unless the elimination of such subsections, sections, or paragraphs shall substantially defeat the intents and purposes of the parties.</div><div style="line-height:19px; font-size: 14px; color: #000000; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WHEREFORE, the Parties have executed this Agreement on the date listed on the first page of this Agreement.</div><h2 style="text-align: left; font-size: 14px; margin: 0; padding: 0; display: inline-block; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EMPLOYER</h2><h2 style="text-align: left; font-size: 14px; margin: 0; padding: 0; display: inline-block; font-weight:normal; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nex Medical Solutions, LLC</h2><h2 style="text-align: left; font-size: 14px; margin: 0; padding: 0; display: inline-block; font-weight:normal; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/s/<span><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/rep_contract_sign.jpg"  width="200px"/></span></h2><h2 style="text-align: left; font-size: 14px; margin: 0; padding: 0; display: inline-block; font-weight:normal; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By:Christopher Parris
</h2><h2 style="text-align: left; font-size: 14px; margin: 0; padding: 0; display: inline-block; font-weight:normal; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hiring Manager<br/></h2><h2 style="text-align: left; font-size: 14px; margin: 0; padding: 0; display: inline-block; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EMPLOYEE</h2><h2 style="text-align: left; font-size: 14px; margin: 0; padding: 0; display: inline-block; font-weight:normal; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/s/';

$html2 = '<u>'.@$salesrep['signature'].'</u>';

$html3 = '</h2><h2 style="text-align: left; font-size: 14px; margin: 0; padding: 0; display: inline-block; font-weight:normal; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;By:'.@$salesrep['salesrepname'].'<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></h2><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EXHIBIT "A"</h2><h2 style="text-align: center; font-size: 14px; margin: 0; padding: 0; font-weight: normal; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>COMPENSATION</u><br/></h2>
<div style="line-height:19px; font-size: 14px; color: #000000; ">During the Part-Time Employment Term:<ol style="list-style-type: lower-roman;"><li>Employee shall be compensated at a rate equal to $ <u>'.@$salesrep['compansationrate'].'</u> per TC. <br /></li><li>Compensation shall become due from, and be payable by, Employer <i>only</i> upon<br /><br />a)&nbsp;&nbsp;&nbsp;&nbsp;Employer’s compensation greater than $100 for its technical component connected to an ANS test(“TC”);<br /><br />b)&nbsp;&nbsp;&nbsp;&nbsp;TC generated as a direct result of the Employee’s placement of the ANS device;<br /><br />c)&nbsp;&nbsp;&nbsp;&nbsp;On the 5<sup>th</sup> day of each month following the Employer’s receipt of the TC during the prior month.    <br /></li><li>(a) Employee shall be required to refund to Employer (or Employer may off-set) any compensation paid to Employeefor which reimbursement is later denied or recovered by any insurance payor, and (b) Employer may reasonably adjust Employee’s compensation upon any declining reimbursement
rates. <br /></li><li>Employer shall provide Employee a monthly compensation report reflecting the TC generated by Employee, and associated details. </li></ol></div><div style="line-height:19px; font-size: 14px; color: #000000; ">EXHIBIT A shall <i>not</i> survive termination if Employee violated any federal or state law during the Part-Time Employment Term of this Agreement, or violates Section IX G and IX H. Notwithstanding the foregoing, section iii (a) and (b) of EXHIBIT A shall survive termination, irrespective of reason for termination.</div>';

// output the HTML content
$pdf->SetFont('times');
//$pdf->SetY(-26);
//$pdf->writeHTML($html1, true, 0, true, true);
$pdf->writeHTML($html1, true, false, true, false, '');

$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '', 96);
$pdf->SetFont($fontname, '', 30, '', false);

$pdf->SetLeftMargin(96);
//$pdf->SetY(164);
//$pdf->writeHTML($html2, true, 0, false, false);
$pdf->writeHTML($html2, true, false, true, false, '');

$pdf->SetLeftMargin(20);
//$pdf->SetY(159);
$pdf->SetFont('times');
//$pdf->writeHTML($html3, true, 0, true, true);
$pdf->writeHTML($html3, true, false, true, false, '');

// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('sales_contract_'.str_replace(" ","_",strtolower($salesrep['salesrepname'])).'_'.time().'.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
