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
        $this->SetY(-10);
        //$this->SetX(-8);
        // Set font
        $this->SetFont('times', 8);
        // Page number
        //$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'right', 0, '', 0, false, 'T', 'M');
        //$this->Cell(0, 10, 'Form I-9 (Rev. 08/07/09) Y Page '.$this->getAliasNumPage(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
        $this->Cell(0,10,'Form I-9 (Rev. 08/07/09) Y Page '.$this->getAliasNumPage(),0,0,'R');

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
$pdf->SetMargins(PDF_MARGIN_LEFT, 10, PDF_MARGIN_RIGHT);

$pdf->SetLeftMargin(8);
$pdf->SetRightMargin(8);



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
global $AI;
$user_id=$AI->user->userID;
$resi9formdata=array();
if(!empty($user_id)){

    $sql=db_query("select * from i9data where user_id=".$user_id);
    $res=db_fetch_assoc($sql);
// echo '<pre>';
    $resi9formdata=unserialize($res['i9_form_data']);
}
//echo '<pre>';
//print_r($resi9formdata);
// echo '</pre>';

$html = '<table width="100%" border="0" >
  <tr>
    <td valign="bottom" align="left" style="font-size: 11px"><strong style="display: block; padding-bottom: 4px;"><br />
      <br />
      Department of Homeland Security</strong><br />
      <span>U.S. Citizenship and Immigration Services</span></td>
    <td  valign="bottom" align="right"><span  style="font-size: 11px; font-weight: normal; margin: 0; padding: 0;" >OMB No. 1615-0047; Expires 08/31/12</span><br/>
      <span style="font-size: 16px; font-weight: bold; margin: 0; padding: 0;"> Form I-9, Employment </span><br/>
      <span style="font-size: 16px; font-weight: bold; margin: 0; padding: 0;"> Eligibility Verification</span> </td>
  </tr>
</table>
<div style="text-align: center; "><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin.jpg"  width="800px"/><strong style="margin: 10px 0 0 0; padding: 0; font-size: 16px;">Instructions</strong><br/>
  <strong style="margin: 0 0 10px 0; padding: 0; font-size: 13px">Read all instructions carefully before completing this form. </strong><br/>
  <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin1.jpg" width="800px" style="margin: 10px 0 0 0"/></div>
<table width="100%" border="0">
  <tr>
    <td style="vertical-align: top" width="48%"><div style="border:  solid 1px #000; margin: 0px; padding: 10px; margin: 0px; display: block; font-size: 11px;"> <strong>Anti-Discrimination Notice.</strong> It is illegal to discriminate against
        any individual (other than an alien not authorized to work in the
        United States) in hiring, discharging, or recruiting or referring for a
        fee because of that individual\'s national origin or citizenship status.
        It is illegal to discriminate against work-authorized individuals.
        Employers <strong>CANNOT</strong> specify which document(s) they will accept
        from an employee. The refusal to hire an individual because the
        documents presented have a future expiration date may also
        constitute illegal discrimination. For more information, call the
        Office of Special Counsel for Immigration Related Unfair
        Employment Practices at 1-800-255-8155.</div>
      <div style="background-color: #c0c0c0;  line-height: 30px; font-weight: bold;">&nbsp;&nbsp;&nbsp;What Is the Purpose of This Form?</div>
      <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfdemoimg.jpg"  />
      <label style="font-size: 13px;">The purpose of this form is to document that each new employee (both citizen and noncitizen) hired after November 6, 1986, is authorized to work in the United States.</label>
     <br/>
      <div style="background-color: #c0c0c0;  line-height: 30px; font-weight: bold;">&nbsp;&nbsp;&nbsp;When Should Form I-9 Be Used?</div>
       <br/>
      <label style="font-size: 13px;">All employees (citizens and noncitizens) hired after November
        6, 1986, and working in the United States must complete
        Form I-9.</label>
       <br/>
      <div style="background-color: #c0c0c0;   line-height: 30px; font-weight: bold;">&nbsp;&nbsp;&nbsp;Filling Out Form I-9</div>
       <br/><label style="font-size: 13px;"> <strong>Section 1, Employee</strong></label>
     <br/> <label style="font-size: 13px;">This part of the form must be completed no later than the time
        of hire, which is the actual beginning of employment.
        Providing the Social Security Number is voluntary, except for
        employees hired by employers participating in the USCIS
        Electronic Employment Eligibility Verification Program (E-
        Verify). <strong>The employer is responsible for ensuring that
        Section 1 is timely and properly completed.</strong> </label><br/><br/>
      <label style="font-size: 13px;"> <strong>Noncitizen nationals of the United States</strong> are persons born in
        American Samoa, certain former citizens of the former Trust
        Territory of the Pacific Islands, and certain children of
        noncitizen nationals born abroad. </label><br/><br/>
      <label style="font-size: 13px;"> <strong>Employers should note</strong> the work authorization expiration
        date (if any) shown in <strong>Section 1</strong> . For employees who indicate
        an employment authorization expiration date in <strong>Section 1</strong> ,
        employers are required to reverify employment authorization
        for employment on or before the date shown. Note that some
        employees may leave the expiration date blank if they are
        aliens whose work authorization does not expire (e.g., asylees,
        refugees, certain citizens of the Federated States of Micronesia
        or the Republic of the Marshall Islands). For such employees,
        reverification does not apply unless they choose to present </label>
    </td>
    <td width="4%">&nbsp;</td>
    <td style="vertical-align: top" width="48%"><label style="font-size: 13px;">in Section 2 evidence of employment authorization that
        contains an expiration date (e.g., Employment Authorization
        Document (Form I-766)). </label>
      <br/><br/>
      <label style="font-size: 13px;"><strong>Preparer/Translator Certification</strong></label>
      <br/><br/>
      <label style="font-size: 13px;">The Preparer/Translator Certification must be completed if <strong>Section 1</strong> is prepared by a person other than the employee. A
        preparer/translator may be used only when the employee is
        unable to complete <strong>Section 1</strong> on his or her own. However, the
        employee must still sign <strong>Section 1</strong> personally. </label>
      <br/><br/>
      <label style="font-size: 13px;"><strong>Section 2, Employer</strong> </label>
      <br/><br/>
      <label style="font-size: 13px;">For the purpose of completing this form, the term "employer"
        means all employers including those recruiters and referrers
        for a fee who are agricultural associations, agricultural
        employers, or farm labor contractors.  Employers must
        complete <strong>Section 2</strong> by examining evidence of identity and
        employment authorization within three business days of the
        date employment begins. However, if an employer hires an
        individual for less than three business days, <strong>Section 2</strong> must be
        completed at the time employment begins. Employers cannot
        specify which document(s) listed on the last page of Form I-9
        employees present to establish identity and employment
        authorization. Employees may present any List A document <strong> OR</strong> a combination of a List B and a List C document. </label>
      <br/> <br/>
      <label style="font-size: 13px;">If an employee is unable to present a required document (or
        documents), the employee must present an acceptable receipt
        in lieu of a document listed on the last page of this form.
        Receipts showing that a person has applied for an initial grant
        of employment authorization, or for renewal of employment
        authorization, are not acceptable. Employees must present
        receipts within three business days of the date employment
        begins and must present valid replacement documents within
        90 days or other specified time. </label>
      <br/>
      <label style="font-size: 13px;"><strong> <br/>Employers must record in Section 2:</strong> </label>
      <br/>  <br/>
      <label style="list-style: none; font-size: 13px;">&nbsp;&nbsp;&nbsp;&nbsp;<strong>1.</strong> Document title;</label>
      <br/>
      <label style="list-style: none; font-size: 13px;">&nbsp;&nbsp;&nbsp;&nbsp;<strong>2.</strong> Issuing authority;</label>
      <br/>
      <label style="list-style: none; font-size: 13px;">&nbsp;&nbsp;&nbsp;&nbsp;<strong>3.</strong> Document number;</label>
      <br/>
      <label style="list-style: none; font-size: 13px;">&nbsp;&nbsp;&nbsp;&nbsp;<strong>4.</strong> Expiration date, if any; and</label>
      <br/>
      <label style="list-style: none; font-size: 13px;">&nbsp;&nbsp;&nbsp;&nbsp;<strong>5.</strong> The date employment begins.</label>
      <br/>
      <label style="font-size: 13px;">Employers must sign and date the certification in <strong>Section 2</strong>. Employees must present original documents. Employers may,
        but are not required to, photocopy the document(s) presented.
        If photocopies are made, they must be made for all new hires.
        Photocopies may only be used for the verification process and
        must be retained with Form I-9. <strong>Employers are still
        responsible for completing and retaining Form I-9.</strong> </label>
    </td>
  </tr>
</table>
  <br/>
  <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin3.jpg"  />
    <br/>
  <br/>
     <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin.jpg"  />

     <table width="100%" border="0" >
        <tr>
            <td width="48%"><label style="font-size: 13px;"><strong>For more detailed information, you may refer to the
                      <i>USCIS Handbook for Employers</i>
                      (Form M-274). You may
                      obtain the handbook using the contact information found
                      under the header "USCIS Forms and Information."</strong></label>
 <br/> <br/>

                <label style="font-size: 13px;"><strong>Section 3, Updating and Reverification</strong></label>
 <br/> <br/>
                <label style="font-size: 13px;">Employers must complete
                    <strong>Section 3</strong>
                    when updating and/or
                    reverifying Form I-9.  Employers must reverify employment
                    authorization of their employees on or before the work
                    authorization expiration date recorded in
                    <strong>Section
                    1</strong>
                    (if any).
                    Employers
                    <strong>CANNOT</strong>
                    specify which document(s) they will
                    accept from an employee</label>
 <br/> <br/>

                <label style="font-size: 13px;"><strong>A.</strong>
                        If an employee\'s name has changed at the time this form
                        is being updated/reverified, complete Block A.</label>
 <br/> <br/>
                <label style="font-size: 13px;"><strong>B.</strong>

                    If an employee is rehired within three years of the date
                    this form was originally completed and the employee is
                    still authorized to be employed on the same basis as
                    previously indicated on this form (updating), complete
                    Block B and the signature block.</label>

 <br/> <br/>
                <label style="font-size: 13px;"><strong>C.</strong>

                    If an employee is rehired within three years of the date
                    this form was originally completed and the employee\'s
                    work authorization has expired
                    or
                    if a current  employee\'s work authorization is about to expire(reverification), complete Block B; and:</label>

 <br/> <br/>

   <label style="font-size: 13px;">&nbsp;&nbsp;&nbsp;&nbsp;<strong>1.</strong>
Examine any document that reflects the employee<br/>
                    is authorized to work in the United States (see List<br/>
A
    <strong>or</strong>
C);</label><br/>

<label style="font-size: 13px;">&nbsp;&nbsp;&nbsp;&nbsp;<strong>2.</strong>
Record the document title, document number, and
&nbsp;&nbsp;&nbsp;&nbsp;expiration date (if any) in Block C; and</label><br/>

<label style="font-size: 13px;">&nbsp;&nbsp;&nbsp;&nbsp;<strong> 3.</strong>
Complete the signature block.</label>


<br/><br/>

                <label style="font-size: 13px;">Note that for reverification purposes, employers have the
                    option of completing a new Form I-9 instead of completing
<strong>Section 3.</strong> </label>
<br/>
               <div style="background-color: #c0c0c0;   line-height: 30px; font-weight: bold;">&nbsp;&nbsp;&nbsp;What Is the Filing Fee?</div>
<br/>
                <label style="font-size: 13px;">There is no associated filing fee for completing Form I-9. This
                    form is not filed with USCIS or any government agency. Form
                    I-9 must be retained by the employer and made available for
    inspection by U.S. Government officials as specified in the
                    Privacy Act Notice below. </label>
<br/>

                <div style="background-color: #c0c0c0;  line-height: 30px; font-weight: bold;">&nbsp;&nbsp;&nbsp;USCIS Forms and Information</div>
<br/>
                <label style="font-size: 13px;">To order USCIS forms, you can download them from our
                    website at www.uscis.gov/forms or call our toll-free number at
                    1-800-870-3676. You can obtain information about Form I-9
                    from our website at www.uscis.gov or by calling
                    1-888-464-4218. </label>



            </td>

             <td width="4%">&nbsp;</td>
            <td width="48%">

 <label style="font-size: 13px;">Information about E-Verify, a free and voluntary program that
     allows participating employers to electronically verify the
     employment eligibility of their newly hired employees, can be
     obtained from our website at www.uscis.gov/e-verify or by
     calling 1-888-464-4218.</label>
<br/><br/>
                <label style="font-size: 13px;">General information on immigration laws, regulations, and
                    procedures can be obtained by telephoning our National
                    Customer Service Center at 1-800-375-5283 or visiting our
                    Internet website at www.uscis.gov.</label>

<br/>

               <div style="background-color: #c0c0c0;   line-height: 30px; font-weight: bold;">&nbsp;&nbsp;&nbsp;Photocopying and Retaining Form I-9</div>

<br/>
                <label style="font-size: 13px;">A blank Form I-9 may be reproduced, provided both sides are
                    copied. The Instructions must be available to all employees
                    completing this form. Employers must retain completed Form
                    I-9s for three years after the date of hire or one year after the
                    date employment ends, whichever is later.</label>
<br/><br/>
                <label style="font-size: 13px;">Form I-9 may be signed and retained electronically, as
                    authorized in Department of Homeland Security regulations
                    at 8 CFR 274a.2.</label>
<br/>
                  <div style="background-color: #c0c0c0; line-height: 30px; font-weight: bold;">&nbsp;&nbsp;&nbsp;Privacy Act Notice</div>
<br/>

                <label style="font-size: 13px;">The authority for collecting this information is the
                    Immigration Reform and Control Act of 1986, Pub. L. 99-603
                    (8 USC 1324a). </label>

<br/><br/>
                <label style="font-size: 13px;">This information will be used by employers as a record of
                    their basis for determining eligibility of an employee to work
                    in the United States. The form will be kept by the employer
and made available for inspection by authorized officials of
                    the Department of Homeland Security, Department of Labor,
                    and Office of Special Counsel for Immigration-Related Unfair
                                                      Employment Practices.</label>

<br/><br/>
                <label style="font-size: 13px;">Submission of the information required in this form is
                    voluntary. However, an individual may not begin employment
                    unless this form is completed, since employers are subject to
                    civil or criminal penalties if they do not comply with the
                    Immigration Reform and Control Act of 1986.</label>



            </td>
        </tr>
    </table>

      <br/>
  <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin3.jpg"  />
<div style="font-size: 13px; text-align: center; font-weight: bold; ">EMPLOYERS MUST RETAIN COMPLETED FORM I-9<br/>
            DO NOT MAIL COMPLETED FORM I-9 TO ICE OR USCIS</div>
            <br/>
            <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin.jpg"  />

<table width="100%" border="0">
            <tr>
                <td>
                    <div style="background-color: #c0c0c0;   line-height: 30px; font-weight: bold;">&nbsp;&nbsp;&nbsp;Paperwork Reduction Act</div>
<br/>
                     <label style="font-size: 13px;">An agency may not conduct or sponsor an information
                        collection and a person is not required to respond to a
                        collection of information unless it displays a currently valid
                        OMB control number. The public reporting burden for this
                        collection of information is estimated at 12 minutes per
                        response, including the time for reviewing instructions and
                        completing and submitting the form.  Send comments
                        regarding this burden estimate or any other aspect of this
                        collection of information, including suggestions for reducing
                        this burden, to: U.S. Citizenship and Immigration Services,
                        Regulatory Management Division, 111 Massachusetts
                        Avenue, N.W., 3rd Floor, Suite 3008, Washington, DC
                        20529-2210. OMB No. 1615-0047.
                        <strong>Do not mail your
                        completed Form I-9 to this address.</strong></label>



                </td>
                <td>&nbsp;</td>
            </tr>
        </table>

<img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin3.jpg"  />
<div>&nbsp;</div>
        <table width="100%" border="0" >
  <tr>
    <td valign="bottom" align="left" style="font-size: 11px"><strong style="display: block; padding-bottom: 4px;"><br />
      <br />
      Department of Homeland Security </strong><br />
      <span>U.S. Citizenship and Immigration Services</span></td>
    <td  valign="bottom" align="right"><span  style="font-size: 11px; font-weight: normal; margin: 0; padding: 0;" >OMB No. 1615-0047; Expires 08/31/12</span><br/>
      <span style="font-size: 16px; font-weight: bold; margin: 0; padding: 0;">Form I-9, Employment </span><br/>
      <span style="font-size: 16px; font-weight: bold; margin: 0; padding: 0;">Eligibility Verification</span> </td>
  </tr>
</table>

<div>&nbsp;</div>
<img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin.jpg"  />
<label style="width: 100%;  font-size: 11px; font-weight: bold;">Read instructions carefully before completing this form. The instructions must be available during completion of this form. </label>
<div>&nbsp;</div>
<label style="width: 100%;  font-size: 13px; font-weight: bold;">ANTI-DISCRIMINATION NOTICE:  It is illegal to discriminate against work-authorized individuals. Employers CANNOT
            specify which document(s) they will accept from an employee.  The refusal to hire an individual because the documents have  a
            future expiration date may also constitute illegal discrimination.</label>
   <br />
<img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin4.jpg"  />
   <br />  <br />
<label style=" font-size: 11px;"><strong>Section 1. Employee Information and Verification</strong>
            <i>(
            To be completed and signed by employee at the time employment begins.)</i></label>
  <br />
<div>
           <table width="100%" border="0" style="width: 100%; border-top: solid 1px #000;  border-bottom: solid 1px #000;"  cellspacing="0" cellpadding="0">
            <tr>
                <td style="margin: 0; padding: 0;" width="75%" style="border-bottom: solid 1px #000;">
                    <table width="100%" border="0"  cellspacing="0" cellpadding="0" style="width: 100%;">
  <tr>
    <td style="padding: 5px;"><label style="font-size: 10px">Print Name: </label>    <span style="font-size: 10px">'.@$resi9formdata["employee_last_name"].'</span> </td>
    <td  style="padding: 5px;"><label style="font-size: 10px">First</label>  <span style="font-size: 10px">'.@$resi9formdata["employee_first_name"].'</span></td>
    <td  style="padding: 5px;"><label style="font-size: 10px">Middle Initial</label> <span style="font-size: 10px">'.@$resi9formdata["employee_middle_initial"].'</span></td>
  </tr>
</table>



                </td>
                <td width="25%" style="border-left: solid 1px #000; border-bottom: solid 1px #000; padding: 5px;">&nbsp;<label style="font-size: 11px">Maiden Name</label> <br /><span style="font-size: 10px">'.@$resi9formdata["employee_maiden_name"].'</span></td>
            </tr>
            <tr>
                <td width="75%" style="border-bottom: solid 1px #000;">


                 <table width="100%" border="0"  cellspacing="0" cellpadding="0">
  <tr>
    <td  style="padding: 5px;"><label style="font-size: 10px">Address <i>(Street Name and Number)</i></label> <br /><span style="font-size: 10px">'.@$resi9formdata["employee_address"].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
    <td  style="padding: 5px;"><label style="font-size: 10px">Apt. #</label> <br /><span style="font-size: 10px">'.@$resi9formdata["employee_apt"].'</span></td>

  </tr>
</table>


                </td>
                <td width="25%" style="border-left: solid 1px #000; border-bottom: solid 1px #000; padding: 5px;">&nbsp;<label style="font-size: 10px">Date of Birth <i>(month/day/year)</i></label> <br />&nbsp;<span style="font-size: 10px">'.@$resi9formdata["employee_dob"].'</span></td>
            </tr>
            <tr>
                <td width="75%" >


  <table width="100%" border="0"  cellspacing="0" cellpadding="0">
  <tr>
    <td  style="padding: 5px;"><label style="font-size: 10px">City</label> <br /><span style="font-size: 10px">'.@$resi9formdata["employee_city"].'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
    <td  style="padding: 5px;"><label style="font-size: 10px">State</label> <br /><span style="font-size: 10px">'.@$resi9formdata["employee_state"].'</span></td>
    <td  style="padding: 5px;"><label style="font-size: 10px">Zip Code</label> <br /><span style="font-size: 10px">'.@$resi9formdata["employee_zip"].'</span></td>
  </tr>
</table>


                </td>
                <td width="25%" style="border-left: solid 1px #000; padding: 5px;">&nbsp;<label style="font-size: 10px">Social Security #</label> <br />&nbsp;<span style="font-size: 10px">'.@$resi9formdata["employee_social_security"].'</span></td>
            </tr>
        </table>




           <table width="100%" border="0" style="width: 100%;   border-bottom: solid 1px #000;"  cellspacing="0" cellpadding="0">
            <tr>
                <td style="margin: 0; padding: 0;" width="50%" style="border-bottom: solid 1px #000;">

<label style="font-size: 13px; font-weight: bold;">I am aware that federal law provides for
                        imprisonment and/or fines for false statements or
                        use of false documents in connection with the
                        completion of this form.</label>


                </td>
                <td width="50%" style="border-left: solid 1px #000; border-bottom: solid 1px #000; padding: 5px;">  <label style="font-size: 10px">&nbsp;I attest, under penalty of perjury, that I am (check one of the following): </label><br />

                    <label style="font-size: 10px">&nbsp;<input type="checkbox" name="box" value="1" readonly="true"  '.((@$resi9formdata['resident_type']==1)? 'checked="checked"': '').'/> A citizen of the United States    </label><br />
                    <label style="font-size: 10px">&nbsp;<input type="checkbox" name="box" value="1" readonly="true"   '.((@$resi9formdata['resident_type']==2)? 'checked="checked"': '').'/> A noncitizen national of the United States (see instructions) </label><br />
                    <label style="font-size: 10px">&nbsp;<input type="checkbox" name="box" value="1" readonly="true" '.((@$resi9formdata['resident_type']==3)? 'checked="checked"': '').' />A lawful permanent resident (Alien #)  <u>'.@$resi9formdata["resident_val"].'</u> </label><br />
                    <label style="font-size: 10px">&nbsp;<input type="checkbox" name="box" value="1" readonly="true"  '.((@$resi9formdata['resident_type']==4)? 'checked="checked"': '').'/> An alien authorized to work (Alien # or Admission #)   <u>'.@$resi9formdata["resident_val"].'</u>   </label><br />

                    <span style="font-size: 10px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;until (expiration date, if applicable -<i>month/day/year</i>)</span></td>
            </tr>

        </table>



         <table width="100%" border="0" style="width: 100%;   border-bottom: solid 1px #000;"  cellspacing="0" cellpadding="0">
            <tr>
             <td width="50%" style=" border-bottom: solid 4px #000; margin: 0; padding: 5px 0; font-size: 11px;">

                <label style="font-size: 11px;">Employee\'s Signature </label>'.@$resi9formdata["employee_signature"].'</td>



                <td width="50%" style=" border-bottom: solid 4px #000; margin: 0; padding: 5px 0; font-size: 11px;">

                <label style="font-size: 11px;">Date <i>(month/day/year)</i> '.@$resi9formdata["employee_date"].'</label></td>
            </tr>

        </table>


          <table width="100%" border="0" style="width: 100%;   border-top: solid 4px #000;"  cellspacing="0" cellpadding="0">
            <tr>



                <td width="100%" style=" margin: 0; padding: 0;">

                <label style="font-size: 13px;"><strong>Preparer and/or Translator Certification</strong>  <i  style="font-size: 10px;">(To be completed and signed if Section 1 is prepared by a person other than the employee.) I attest, under
penalty of perjury, that I have assisted in the completion of this form and that to the best of my knowledge the information is true and correct</i> </label></td>
            </tr>

        </table>

        <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="2%">&nbsp;</td>
    <td width="52%" style=" border-top: solid 1px #000;">&nbsp;<label style="font-size: 10px">Preparer\'s/Translator\'s Signature</label> <br />&nbsp;<span style="font-size: 10px">'.@$resi9formdata["preparer_signature"].'</span></td>
    <td width="44%" style=" border-top: solid 1px #000; border-left: solid 1px #000;">&nbsp;<label style="font-size: 10px">Print Name</label> <br />&nbsp;<span style="font-size: 10px">'.@$resi9formdata["preparer_print_name"].'</span></td>
    <td width="2%">&nbsp;</td>
  </tr> 
   <tr>
    <td width="2%">&nbsp;</td>
    <td width="58%" style=" border-top: solid 1px #000;  border-bottom: solid 1px #000;">&nbsp;<label style="font-size: 10px">Address <i>(Street Name and Number, City, State, Zip Code)</i></label> <br />&nbsp;<span style="font-size: 10px">'.@$resi9formdata["preparer_address"].'</span></td>
    <td width="38%" style=" border-top: solid 1px #000; border-left: solid 1px #000; border-bottom: solid 1px #000;">&nbsp;<label style="font-size: 10px">Date <i>(month/day/year)</i></label> <br />&nbsp;<span style="font-size: 10px">'.@$resi9formdata["preparer_date"].'</span></td>
    <td width="2%">&nbsp;</td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:solid 2px #000;">
  <tr>
    <td width="100%" style="border-top:solid 2px #000;"> <label style="font-size: 13px;"><strong>Section 2. Employer Review and Verification </strong>  <i  style="font-size: 12px;">(To be completed and signed by employer. Examine one document from List A OR
examine one document from List B and one from List C, as listed on the reverse of this form, and record the title, number, and
expiration date, if any, of the document(s).)</i> </label></td>

  </tr>
</table>


<table width="100%" border="0" style="border-top:solid 2px #000;">
            <tr>
                <th style="text-align:center; font-size: 13px; font-weight: bold;" width="34%">List A</th>
                <th style="text-align:center; font-size: 13px; font-weight: bold;" width="5%">OR</th>
                <th style="text-align:center; font-size: 13px; font-weight: bold;" width="27%">List B</th>
                <th style="text-align:center; font-size: 13px; font-weight: bold;" width="8%"><u>AND</u></th>
                <th style="text-align:center; font-size: 13px; font-weight: bold;" width="27%">List C</th>
            </tr>
            <tr>
                <td>

<label style="font-size: 11px;">Document title:</label><input type="text" /> <u style="font-size: 10px">'.@$resi9formdata["employer_document_title1"].'</u>

  <br/>

                        <label style="font-size: 11px;">Issuing authority:</label><input type="text" /> <u style="font-size: 10px">'.@$resi9formdata["employer_issuing_authority1"].'</u>

  <br/>

                        <label style="font-size: 11px;">Document #:</label><input type="text" /> <u style="font-size: 10px">'.@$resi9formdata["employer_document11"].'</u>

  <br/>

                        <label style="font-size: 11px;">Expiration Date <i>(if any):</i></label><input type="text" /> <u style="font-size: 10px">'.@$resi9formdata["employer_document_date11"].'</u>

  <br/>

                        <label style="font-size: 11px;">Document #:</label><input type="text" /> <u style="font-size: 10px">'.@$resi9formdata["employer_document21"].'</u>


                   <br/>
                        <label style="font-size: 11px;">Expiration Date <i>(if any):</i></label><input type="text" /> <u style="font-size: 10px">'.@$resi9formdata["employer_document_date21"].'</u>


                </td>
                <td style="background-color: #ccc;">&nbsp;</td>
                <td>

                      <u style="font-size: 10px">'.@$resi9formdata["employer_document_title2"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_issuing_authority2"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_document12"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_document_date12"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_document22"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_document_date22"].'</u>

                </td>
                <td >&nbsp;</td>
                <td><u style="font-size: 10px">'.@$resi9formdata["employer_document_title3"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_issuing_authority3"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_document13"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_document_date13"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_document23"].'</u> <br/>
                      <u style="font-size: 10px">'.@$resi9formdata["employer_document_date23"].'</u>
                </td>
            </tr>
        </table>
<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:solid 2px #000;">
  <tr>
    <td width="100%" style="border-top:solid 2px #000;">
<label style="font-size: 11px; font-weight:bold;">CERTIFICATION: I attest, under penalty of perjury, that I have examined the document(s) presented by the above-named employee, that
    the above-listed document(s) appear to be genuine and to relate to the employee named, that the employee began employment on<br/>
    <i style="font-weight:normal;">(month/day/year)</i> <u>'.@$resi9formdata["employer_attested_date"].'</u> and that to the best of my knowledge the employee is authorized to work in the United States.   (State
    employment agencies may omit the date the employee began employment.)</label>
 </td>
            </tr>
        </table>






               <table width="100%" border="0" style="border-top:solid 2px #000;">
            <tr>
                <td width="36%"><label style="font-size: 11px;">Signature of Employer or Authorized Representative</label><br/><u style="font-size: 10px">'.@$resi9formdata["employer_signature"].'</u> </td>
                <td width="32%"  style="border-left:solid 2px #000;"><label style="font-size: 11px;">Print Name</label><br/><u style="font-size: 10px">'.@$resi9formdata["employer_print_name"].'</u></td>
                <td width="32%"  style="border-left:solid 2px #000;"><label style="font-size: 11px;">Title</label><br/><u style="font-size: 10px">'.@$resi9formdata["employer_title"].'</u> </td>
            </tr>
        </table>




         <table width="100%" border="0" style="border-top:solid 2px #000; border-bottom:solid 2px #000;">
            <tr>
                <td width="68%" style="border-bottom:solid 2px #000;"><label style="font-size: 11px;">Business or Organization Name and Address
                        <i >(Street Name and Number, City, State, Zip Code)</i></label><br/>
                <span style="font-size: 11px;  letter-spacing: 2px;">IRS-HCO, 5333 GETWELL RD./ Memphis, TN, 38118</span>
                </td>
                <td width="32%"  style="border-left:solid 2px #000; border-bottom:solid 2px #000;"><label style="font-size: 11px;">Date <i>(month/day/year)
                        </i></label>  <u style="font-size: 11px;">'.@$resi9formdata["employer_date"].'</u> </td>

            </tr>
        </table>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:solid 2px #000;">
  <tr>
    <td width="100%" style="border-top:solid 2px #000;"><label style="font-size: 12px; font-weight: bold;" ><strong >Section 3. Updating and Reverification</strong>
        <i style=" font-weight: normal;">(To be completed and signed by employer.)</i></label></td>

  </tr>
</table>

 <table width="100%" border="0" style=" border-top:solid 2px #000;">
            <tr>
                <td width="60%"><label  style="font-size: 11px;">A. New Name <i>(if applicable)</i></label><br/> <u style="font-size: 11px;">'.@$resi9formdata["new_employer_name"].'</u> </td>
                <td width="40%" style="border-left:solid 2px #000;"><label style="font-size: 11px;">B. Date of Rehire <i>(month/day/year) (if applicable</i></label><br/> <u style="font-size: 11px;">'.@$resi9formdata["new_employer_rehire_date"].'</u> </td>

            </tr>
        </table>

         <table width="100%" border="0" style=" border-top:solid 2px #000;">
            <tr>
                <td width="100%"><label  style="font-size: 9px;">C. If employee\'s previous grant of work authorization has expired, provide the information below for the document that establishes current employment authorization. </label><br/>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label  style="font-size: 11px;">Document Title:</label><u style="font-size: 11px;">'.@$resi9formdata["current_document_title"].'</u>   <label  style="font-size: 11px;">Document #:</label><u style="font-size: 11px;">'.@$resi9formdata["current_document"].'</u> <label  style="font-size: 11px;">Expiration Date<i>(if any):</i></label> <u style="font-size: 11px;">'.@$resi9formdata["current_expire_date"].'</u>

         </td>
            </tr>
        </table>


          <table width="100%" border="0" style=" border-top:solid 2px #000;">
            <tr>
                <td width="100%"><label  style="font-size: 10px; font-weight: bold; line-height: 12px;">l attest, under penalty of perjury, that to the best of my knowledge, this employee is authorized to work in the United States, and if the employee presented
document(s), the document(s) l have examined appear to be genuine and to relate to the individual.</label><br/>


         </td>
            </tr>
        </table>

<table width="100%" border="0" style="border-top:solid 2px #000; border-bottom:solid 4px #000;">
            <tr>
                <td width="68%" style="border-bottom:solid 4px #000;"><label style="font-size: 11px;">Signature of Employer or Authorized Representative</label><br/>
               <u style="font-size: 11px;">'.@$resi9formdata["current_employer_sign"].'</u>
                </td>
                <td width="32%"  style="border-left:solid 2px #000; border-bottom:solid 4px #000;"><label style="font-size: 11px;">Date <i>(month/day/year)
                        </i></label> <br/> <u style="font-size: 11px;">'.@$resi9formdata["current_employer_date"].'</u> </td>

            </tr>
        </table>
        <br/><br/>
<img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin.jpg"  /><br/>
        <table width="100%">
            <tr>
                <td style="text-align: center">
                <label style="font-size: 16px; font-weight: bold;">LISTS OF ACCEPTABLE DOCUMENTS</label><br/>
        <label style="font-size: 13px; font-weight: bold;">All documents must be unexpired</label>
        </td>

            </tr>
        </table>
<br/><br/>

<table width="100%" border="0">
            <tr>
                <td style="vertical-align: top;
text-align: center;
width: 30%;">
                    <label style="font-size: 13px;font-weight: bold;">LIST A</label><br/><br/>
                    <label style="font-size: 13px;font-weight: bold;">Documents that Establish Both<br/>
                        Identity and Employment<br/>
                        Authorization</label>
                </td>
                <td style="vertical-align: bottom;
text-align: center;
padding: 0 10px;
font-size: 16px;
width: 5%;"><br/><br/><br/><br/><br/><label style="font-size: 13px;font-weight: bold;">OR</label></td>
                <td style="vertical-align: top;
text-align: center;
width: 30%;">
                    <label style="font-size: 13px;font-weight: bold;">LIST B</label><br/><br/>
                    <label style="font-size: 13px;font-weight: bold;">Documents that Establish<br/>
                        Identity </label>
                </td>
                <td style="vertical-align: bottom;
text-align: center;
padding: 0 10px;
font-size: 16px;
width: 5%;"><br/><br/><br/><br/><br/><label style="font-size: 13px;font-weight: bold;">AND</label></td>
                <td style="vertical-align: top;
text-align: center;
width: 30%;">
                    <label style="font-size: 13px;font-weight: bold;">LIST C</label><br/><br/>
                    <label style="font-size: 13px;font-weight: bold;">Documents that Establish<br/>
                        Employment Authorization</label>
                </td>
            </tr>
        </table>


        <table width="100%" border="0" style="border: solid 1px #000; font-size: 11px;">
            <tr>
                <td width="33.3%">
                    <div  style="border-bottom: solid 1px #000; "><br/><br/><strong>1.</strong>
                        U.S. Passport or U.S. Passport Card<br/><br/></div>

                    <div  style="border-bottom: solid 1px #000; "><br/><br/><strong>2.</strong>
                        Permanent Resident Card or Alien
                        Registration Receipt Card (Form
                        I-551)<br/><br/><br/></div>

                    <div style="border-bottom: solid 1px #000; " ><strong>3.</strong>
                        Foreign passport that contains a
                        temporary I-551 stamp or temporary
                        I-551 printed notation on a machine-
                        readable immigrant visa</div>


                    <div style="border-bottom: solid 1px #000; "><strong>4.</strong>
                        Employment Authorization Document
                        that contains a photograph (Form
                        I-766) </div>


                    <div style="border-bottom: solid 1px #000; "><strong>5.</strong>
                        In the case of a nonimmigrant alien
                        authorized to work for a specific
                        employer incident to status, a foreign
                        passport with Form I-94 or Form
                        I-94A bearing the same name as the
                        passport and containing an
                        endorsement of the alien\'s
                        nonimmigrant status, as long as the
                        period of endorsement has not yet
                        expired and the proposed
                        employment is not in conflict with
                        any restrictions or limitations
                        identified on the form</div>


                    <div><strong>6.</strong>
Passport from the Federated States of
                        Micronesia (FSM) or the Republic of
                        the Marshall Islands (RMI) with
                        Form I-94 or Form I-94A indicating
                        nonimmigrant admission under the
                        Compact of Free Association
                        Between the United States and the
                        FSM or RMI</div>


                </td>

                <td width="33.3%" style="border-left: solid 1px #000;">
                    <div style="border-bottom: solid 1px #000; "><strong>1.</strong>

Driver\'s license or ID card issued by
                        a State or outlying possession of the
                        United States provided it contains a
                        photograph or information such as
                        name, date of birth, gender, height,
                        eye color, and address <br/><br/></div>

                    <div style="border-bottom: solid 1px #000; "><strong>2.</strong>
                        ID card issued by federal, state or
                        local government agencies or
                        entities, provided it contains a
                        photograph or information such as
                        name, date of birth, gender, height,
                        eye color, and address<br/></div>


                    <div style="border-bottom: solid 1px #000; "><strong>3.</strong>
                        School ID card with a photograph</div>



                    <div style="border-bottom: solid 1px #000; "><strong>4.</strong>
                        Voter\'s registration card</div>

                    <div style="border-bottom: solid 1px #000; "><strong>5.</strong>
U.S. Military card or draft record</div>

                    <div style="border-bottom: solid 1px #000; "><strong>6.</strong>
Military dependent\'s ID card</div>

                    <div style="border-bottom: solid 1px #000; "><strong>7.</strong>
                        U.S. Coast Guard Merchant Mariner
                        Card</div>


                    <div style="border-bottom: solid 1px #000; "><strong>8.</strong>
                        Native American tribal document</div>

                    <div style="border-bottom: solid 1px #000; "><strong>9.</strong>
                        Driver\'s license issued by a Canadian
                        government authority<br/><br/></div>


                    <div style="border-bottom: solid 1px #000; "><strong>For persons under age 18 who
                            are unable to present a
                            document listed above:  <br/><br/> </strong></div>

                    <div style="border-bottom: solid 1px #000; "><strong>10.</strong>
School record or report card</div>

                    <div style="border-bottom: solid 1px #000; "><strong>11.</strong>
Clinic, doctor, or hospital record</div>

                    <div ><strong>12.</strong>
Day-care or nursery school record<br/><br/></div>

                </td>


                <td width="33.3%" style="border-left: solid 1px #000;">

                    <div style="border-bottom: solid 1px #000; "><strong>1.</strong>
Social Security Account Number
                        card other than one that specifies
                        on the face that the issuance of the
                        card does not authorize
                        employment in the United States</div>


                    <div style="border-bottom: solid 1px #000; "><strong>2.</strong>

Certification of Birth Abroad
                        issued by the Department of State
(Form FS-545)</div>


                    <div style="border-bottom: solid 1px #000; "><strong>3.</strong>

Certification of Report of Birth
                        issued by the Department of State
(Form DS-1350)</div>

                    <div style="border-bottom: solid 1px #000; "><strong>4.</strong>
Original or certified copy of birth
                        certificate issued by a State,
                        county, municipal authority, or
                        territory of the United States
                        bearing an official seal</div>

                    <div style="border-bottom: solid 1px #000; "><strong>5.</strong>
Native American tribal document</div>

                    <div style="border-bottom: solid 1px #000; "><strong>6.</strong>
U.S. Citizen ID Card (Form I-197)</div>

                    <div style="border-bottom: solid 1px #000; "><strong>7.</strong>
Identification Card for Use of
                        Resident Citizen in the United
                        States (Form I-179)</div>

                    <div ><strong>8.</strong>
Employment authorization
                        document issued by the
                        Department of Homeland Security</div>


                </td>



            </tr>
        </table>


          <table width="100%" border="0" style="border-top: solid 1px #000; font-size: 12px; font-weight: bold;">
            <tr>
                <td width="100%">
<br/>
<div>Illustrations of many of these documents appear in Part 8 of the Handbook for Employers (M-274)</div>
<img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin2.jpg"  />
<!--<br/><br/><br/>-->
                </td>
                </tr>
               </table>

 </div>';
//$pdf->SetY(1);

// output the HTML content
//$pdf->writeHTML($html, true, 0, true, true);
//$pdf->writeHTML($html, true, false, true, false, '');
$pdf->writeHTML($html);
// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('9employmenteligibilityverification.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
