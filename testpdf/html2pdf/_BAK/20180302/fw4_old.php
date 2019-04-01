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
        $this->Cell(0,10,'Form fw4 (Rev. 08/07/09) Y Page '.$this->getAliasNumPage(),0,0,'R');
        // Page number
        //$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().' of '.$this->getAliasNbPages(), 0, false, 'right', 0, '', 0, false, 'T', 'M');
        //$this->Cell(0, 10, 'Form I-9 (Rev. 08/07/09) Y Page '.$this->getAliasNumPage(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
       // $this->Cell(0,10,'Form I-9 (Rev. 08/07/09) Y Page '.$this->getAliasNumPage(),0,0,'R');

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
//$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
$pdf->SetMargins(PDF_MARGIN_LEFT, 5, PDF_MARGIN_RIGHT,5);

$pdf->SetLeftMargin(8);
$pdf->SetRightMargin(8);


$pdf->setPrintHeader(false);
//$pdf->setPrintFooter(false);

$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);






// set auto page breaks
//$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
$pdf->SetAutoPageBreak(TRUE, 10);

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

// create some HTML content
/*$html = '<h1>Example of HTML text flow</h1>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. <em>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</em> <em>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</em><br /><br /><b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i> -&gt; &nbsp;&nbsp; <b>A</b> + <b>B</b> = <b>C</b> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>B</i> = <i>A</i> &nbsp;&nbsp; -&gt; &nbsp;&nbsp; <i>C</i> - <i>A</i> = <i>B</i><br /><br /><b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u> <b>Bold</b><i>Italic</i><u>Underlined</u>';*/
global $AI;
$user_id=$AI->user->userID;
$resw4formdata=array();
if(!empty($user_id)){

    $sql=db_query("select * from w4data where user_id=".$user_id);
    $res=db_fetch_assoc($sql);

    $resw4formdata=unserialize($res['w4_form_data']);
   // echo '<pre>';
   // print_r($resw4formdata);
  //  echo '</pre>';

}

$html = '
<img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin1.jpg"  /><br/>



<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 8px; ">
           <tr>
               <td align="left" valign="top" width="30.3%">
                   <div style=" font-size: 16px; font-weight: bold; ">Form W-4 (2017)</div>
                    <span style="display: block; background-color: #000;"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/demoh1border.jpg"  /></span><br/>
                  <div style="display: block;"><strong>Purpose.</strong>
                       Complete Form W-4 so that your
                       employer can withhold the correct federal income
                       tax from your pay. Consider completing a new
                       Form
                       W-4 each year and when your personal or
                       financial
                       situation changes.<br/><br/><strong>Exemption from withholding.</strong> If you are
                       exempt,
                       complete
                       only
                       lines 1, 2, 3, 4, and 7
                       and sign the
                       form to validate it. Your exemption
                       for 2017 expires
                       February 15, 2018. See
                       Pub. 505, Tax Withholding
                       and Estimated Tax.
                   <br/><br/><strong>Note:</strong>
                       If another person can claim you as a
                       dependent
                       on his or her tax return, you can’t claim exemption
                       from
                       withholding if your total income exceeds $1,050
                       and includes more than $350 of unearned
                       income (for
                       example, interest and dividends).<br/><br/> &nbsp;&nbsp;&nbsp;&nbsp;<strong><i>Exceptions</i></strong>
                       . An employee may be able to claim
                       exemption from withholding even if the employee is
                       a dependent, if the employee:<br/><br/><strong>&bull;</strong> Is age 65 or older,<br/>
                       <strong>&bull;</strong> Is blind, or<br/>
                       <strong>&bull;</strong> Will claim adjustments to income; tax credits; or
                       itemized deductions, on his or her tax return.
                     </div>




               </td>

               <td width="3%">&nbsp;</td>
               <td align="left" valign="top" width="31.3%">
                   <div style="display: block;">The exceptions don’t apply to supplemental wages
                       greater than $1,000,000<br/><br/><strong>Basic instructions.</strong>
                       If you aren’t exempt,
                       complete
                       the
                       <strong>Personal Allowances Worksheet</strong>
                       below. The
                       worksheets on page 2 further adjust
                       your
                       withholding allowances based on itemized
                       deductions, certain credits, adjustments to
                       income,
                       or two-earners/multiple jobs situations. <br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;Complete all worksheets that apply. However, you
                       may claim fewer (or zero) allowances. For regular
                       wages, withholding must be based on allowances
                       you claimed and may not be a flat amount or
                       percentage of wages<br/><br/><strong>Head of household.</strong>
                       Generally, you can claim
                       head
                       of household filing status on your tax
                       return only if
                       you are unmarried and pay more
                       than 50% of the
                       costs of keeping up a home
                       for yourself and your
                       dependent(s) or other
                       qualifying individuals. See
                       Pub. 501,
                       Exemptions, Standard Deduction, and
                       Filing
                       Information, for information.<br/><br/><strong>Tax credits.</strong>
                           You can take projected tax
                           credits into
                           account in figuring your allowable
                           number of
                           withholding allowances. Credits for
                           child or dependent
                           care expenses and the
                           child tax credit may be claimed
                           using the
                       <strong>Personal Allowances Worksheet</strong>
                           below.
                           See
                           Pub. 505 for information on converting
                           your other
                           credits into withholding allowances.</div>


               </td>
                <td width="3%">&nbsp;</td>
               <td align="left" valign="top" width="32.3%">

            <div style="display: block;"><strong>Nonwage income.</strong>
                If you have a large amount
                of
                nonwage income, such as interest or
                dividends,
                consider making estimated tax payments using Form
                1040-ES, Estimated Tax for Individuals. Otherwise,
                you may owe additional tax. If you have pension or
                annuity income, see Pub. 505 to find out if you should
                adjust your withholding on Form W-4 or W-4P.<br/><br/><strong>Two earners or multiple jobs.</strong>
                       If you have a
                       working spouse or more than one job, figure
                       the
                       total number of allowances you are entitled
                       to claim
                       on all jobs using worksheets from only
                       one Form
                       W-4. Your withholding usually will
                       be most accurate
                       when all allowances are
                       claimed on the Form W-4
                       for the highest
                       paying job and zero allowances are
                       claimed on
                       the others. See Pub. 505 for details.<br/><br/><strong>Nonresident alien.</strong>
                       If you are a nonresident
                       alien, see
                       Notice 1392, Supplemental Form
                       W-4 Instructions for
                       Nonresident Aliens, before
                       completing this form.<br/><br/><strong>Check your withholding.</strong>
                           After your Form W-4
                           takes
                           effect, use Pub. 505 to see how the
                           amount you are
                           having withheld compares to
                           your projected total tax
                           for 2017. See Pub.
                           505, especially if your earnings
                           exceed
                           $130,000 (Single) or $180,000 (Married).<br/><br/><strong>Future developments.</strong>
                           Information about any future
                           developments affecting Form W-4 (such as
                           legislation enacted after we release it) will be posted
                           <i>at www.irs.gov/w4.</i>
                  </div>


               </td>
           </tr>
       </table>





<div style="display: block; text-align: center; border-bottom: solid 1px #000; border-top: solid 1px #000; margin: 0; padding: 0; font-size: 14px;">
<strong style="font-weight: bold;">Personal Allowances Worksheet</strong> <span style="font-weight: normal;">(Keep for your records.)</span>
</div>

<div>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">A</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="86%">Enter “1” for
                    <strong>yourself</strong>
                    if no one else can claim you as a dependent <b style="letter-spacing: 5px;">.......................................</b>
                    </td>
                <td align="right" valign="middle" style="padding: 5px 0;" width="10%"><strong>A  <u>'.@$resw4formdata['personal_allowance_a'].'</u></strong></td>
            </tr>

            </table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px; line-height: 40px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">B</strong>&nbsp;&nbsp;</td>

                 <td align="left" valign="middle" width="10%"  style="line-height: 40px;">Enter “1” if: </td>
                 <td align="left" valign="middle" width="3%"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/fw4_img1.jpg" /></td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="56%"><strong>•</strong> You’re single and have only one job; or<br/>
                                <strong>•</strong> You’re married, have only one job, and your spouse doesn’t work; or<br/>
                                <strong>•</strong> Your wages from a second job or your spouse’s wages (or the total of both) are $1,500 or less.
                    </td>

                     <td align="left" valign="middle" width="3%"> <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/fw4_img2.jpg" /> </td>
                  <td align="left" valign="middle" width="14%" style="line-height: 40px;"> <b style="letter-spacing: 5px;">...</b></td>

                <td align="right" valign="middle" style="padding: 5px 0; line-height: 40px;" width="10%"><strong>B&nbsp;&nbsp;<u>'.@$resw4formdata['personal_allowance_b'].'</u></strong></td>
            </tr>

            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">C</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="86%">Enter
“1”
for
your
<strong>spouse.</strong>
But,
you
may
choose
to
enter
“-0-”
if you
are
married
and
have
either
a working
spouse
or
more
than one job. (Entering “-0-” may help you avoid having too little tax withheld.)  <b style="letter-spacing: 5px;">................................................</b>
                    </td>
                <td align="right" valign="middle" style="padding: 5px 0;" width="10%"><strong>C&nbsp;&nbsp;<u>'.@$resw4formdata['personal_allowance_c'].'</u></strong></td>
            </tr>

            </table>


          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">D</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="86%">Enter number of
                    <strong>dependents</strong>
                    (other than your spouse or yourself) you will claim on your tax return <b style="letter-spacing: 5px;">.........................</b>
                    </td>
                <td align="right" valign="middle" style="padding: 5px 0;" width="10%"><strong>D&nbsp;<u>'.@$resw4formdata['personal_allowance_d'].'</u></strong></td>
            </tr>

            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">E</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="86%">Enter “1” if you will file as
                    <strong>head of household</strong>
                    on your tax return (see conditions under
                    <strong>Head of household</strong>
                    above)<b style="letter-spacing: 5px;">................</b>
                    </td>
                <td align="right" valign="middle" style="padding: 5px 0;" width="10%"><strong>E&nbsp;&nbsp;<u>'.@$resw4formdata['personal_allowance_e'].'</u></strong></td>
            </tr>

            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">F</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="86%">Enter “1” if you have at least $ 2,000  of <strong>child or dependent care expenses</strong> for which you plan to claim a credit <b>. . .</b><br/>(<strong>Note:</strong> Do
                    <strong>not</strong> include child support payments. See Pub. 503, Child and Dependent Care Expenses, for details.)
                    </td>
                <td align="right" valign="middle" style="padding: 5px 0;" width="10%"><strong>F&nbsp;&nbsp;<u>'.@$resw4formdata['personal_allowance_f'].'</u></strong></td>
            </tr>

            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">G</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="86%"><strong>Child Tax Credit</strong>
                    (including additional child tax credit). See Pub. 972, Child Tax Credit, for more information.<br/>
                    <strong>•</strong> If your total income will be less than $
                    70,000
                    ($
                    100,000
                    if married), enter “2” for each eligible child; then
                    <strong>less</strong>
                    “1” if you
                    have two to four eligible children or
                    <strong>less</strong>
                    “2” if you have five or more eligible children.<br/>
                    <strong>•</strong> If your total income will be between $70,000 and $84,000 ($100,000 and $119,000 if married), enter “1” for each eligible child
                    .
                    </td>
                <td align="right" valign="middle" style="padding: 5px 0;" width="10%"><br/><br/><br/><br/><strong>G&nbsp;&nbsp;<u>'.@$resw4formdata['personal_allowance_g'].'</u></strong></td>
            </tr>

            </table>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">H</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="86%">Add lines A through G and enter total here. (
                    <strong>Note:</strong>
                    This may be different from the number of exemptions you claim on your tax return.)
                    <strong><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/demoh1arrow2.jpg" width="6px;" /></strong>
                    </td>
                <td align="right" valign="middle" style="padding: 5px 0;" width="10%"><strong>H&nbsp;&nbsp;<u>'.@$resw4formdata['personal_allowance_h'].'</u></strong></td>
            </tr>

            </table>

<br/><br/>

            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px; line-height: 40px;" width="4%">&nbsp;&nbsp;&nbsp;&nbsp;</td>

             <td align="left" valign="middle" width="10%">For accuracy,<br/>
                    <strong>complete all
                    worksheets
                    that apply.</strong></td>
                 <td align="left" valign="middle" width="3%"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/fw4_img1.jpg" /></td>


                <td align="left" valign="middle" style="padding: 5px 20px;" width="85%"> <strong>•</strong>
                    If you plan to
                    <strong>itemize</strong>
                    or
                    <strong>claim adjustments to income</strong>
                    and want to reduce your withholding, see the
                    <strong>Deductions
                    and Adjustments Worksheet</strong>
                    on page 2.<br/>
                    <strong>•</strong>
                    If you are
                    <strong>single and have
                    more than one job</strong>
                    or are
                    <strong>married and you and your spouse both work</strong>
                    and the combined
                    earnings from all jobs exceed
                    $
                    50,000
                    ($
                    20,000
                    if married), see the
                    <strong>Two-Earners/Multiple Jobs Worksheet</strong>
                    on page 2
                    to avoid having too little tax withheld.<br/>
                    <strong>•</strong>
                    If
                    <strong>neither</strong>
                    of the above situations applies,
                    <strong>stop here</strong>
                    and enter the number from line H on line 5 of Form W-4 below.
                    </td>




            </tr>

            </table>

<img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/pdfmargin1.jpg"  /><br/>


     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; text-align: center;">
            <tr>
                <td align="center" valign="middle" style="padding: 5px 10px; text-align: center;" width="100%"><span style="letter-spacing: 1px;">...........................................</span><strong>Separate here and give Form W-4 to your employer. Keep the top part for your records.</strong><span style="letter-spacing: 1px;">...........................................</span></td>

            </tr>

            </table>
<br/><br/>
       <table width="100%" border="0" cellspacing="0" cellpadding="0">
           <tr>
               <td align="left" valign="top" width="15%;" style="border-bottom: solid 2px #000; border-right: solid 2px #000; font-size: 8px;">Form
                   <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/fw4_img3.jpg"  width="60px;"/><br/>
                   Department of the Treasury
                   Internal Revenue Service </td>
               <td align="center" valign="top"  width="70%;" style="padding: 0 10px; border-bottom: solid 2px #000; "><h1 style="font-size: 18px;">Employee’s Withholding Allowance Certificate</h1>
               <h2 style="font-size: 9px;"> <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/demoh1arrow2.jpg"  width="6px"/> Whether you are entitled to claim a certain number of allowances or exemption from withholding is
                   subject to review by the IRS. Your employer may be required to send a copy of this form to the IRS. </h2>
               </td>
               <td align="left" valign="top"  width="15%;" style="text-align: center; border-left: solid 2px #000; border-bottom: solid 2px #000; font-size: 8px;">
                   OMB No. 1545-0074<br/><br/>
                   <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/fw4_img4.jpg" width="80px;"/>

               </td>
           </tr>
       </table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" class="fw4_table2" style="border-bottom: solid 1px #959595; font-size: 9px;">
           <tr>
               <td align="left" valign="top" >&nbsp;&nbsp;<strong>1&nbsp;&nbsp;&nbsp;&nbsp;</strong>Your first name and middle initia &nbsp;<u>'.@$resw4formdata["employee_first_name_middle_initial"].'</u>

               </td>
               <td align="left" valign="top" style="border-left: solid 1px #959595; border-right: solid 1px #959595; padding: 0 15px;">&nbsp;&nbsp;Last name&nbsp;<u>'.@$resw4formdata["employee_last_name"].'</u>

               </td>
               <td align="left" valign="top">
                   &nbsp;&nbsp;<strong>2&nbsp;&nbsp;&nbsp;&nbsp;Your social security number</strong>&nbsp;<u>'.@$resw4formdata["employee_social_security_number"].'</u>

               </td>
           </tr>
       </table>


         <table width="100%" border="0" cellspacing="0" cellpadding="0"  style="border-bottom: solid 1px #959595; font-size: 9px;">
           <tr>
               <td align="left" valign="top" style=" border-bottom: solid 1px #959595; border-right: solid 2px #959595;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home address (number and street or rural route)<br>'.@$resw4formdata["employee_home_address"].'
               </td>
               <td align="left" valign="top" style="border-left: solid 2px #959595; border-bottom: solid 1px #959595;">&nbsp;&nbsp;3
                  <input type="checkbox" name="box" value="1" readonly="true"  '.((@$resw4formdata['employee_marital_status']==1)? 'checked="checked"': '').'  /> Single
                   <input type="checkbox" name="box" value="2" readonly="true" '.((@$resw4formdata['employee_marital_status']==2)? 'checked="checked"': '').' /> Married
                  <input type="checkbox" name="box" value="3" readonly="true" '.((@$resw4formdata['employee_marital_status']==3)? 'checked="checked"': '').'  /> Married, but withhold at higher Single rate.<br/>
                   &nbsp;&nbsp;&nbsp;<strong>Note:</strong>
                   If married, but legally separated, or spouse is a nonresident alien, check the “Single” box.</td>

           </tr>
       </table>

       <table width="100%" border="0" cellspacing="0" cellpadding="0"  style="border-bottom: solid 1px #959595; font-size: 9px;">
           <tr>
               <td align="left" valign="top" style=" border-bottom: solid 1px #959595; border-right: solid 2px #959595;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City or town, state, and ZIP code
               <br>'.@$resw4formdata["employee_city_state"].'
               </td>
               <td align="left" valign="top" style="border-left: solid 2px #959595; border-bottom: solid 1px #959595;">&nbsp;&nbsp;<strong>4
If your last name differs from that shown on your social security card,
check here. You must call 1-800-772-1213 for a replacement card.  </strong> <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/demoh1arrow2.jpg"  width="6px"/>
                  <input type="checkbox" name="box" value="1" readonly="true" '.((@$resw4formdata['employee_replace_card']==1)? 'checked="checked"': '').' />
                   </td>

           </tr>
       </table>



 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">5</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="84%">Total number of allowances you are claiming (from line
<strong style="font-weight: bold;">H</strong>
above
<strong style="font-weight: bold;">or</strong>
from the applicable worksheet on page 2)
                    </td>
                <td align="center" valign="middle" style="padding: 5px 0; border-bottom: solid 1px #6f6c6c; border-left: solid 1px #6f6c6c;" width="2%">5</td>
                <td align="left" valign="middle" style="padding: 5px 0; border-bottom: solid 1px #6f6c6c; border-left: solid 1px #6f6c6c;" width="10%">'.@$resw4formdata["employee_number_allowance"].'</td>
            </tr>

            </table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">6</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="84%">Additional amount, if any, you want withheld from each paycheck
<b style="letter-spacing: 5px;">.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.

</b></td>
<td align="center" valign="middle" style="padding: 5px 0; border-bottom: solid 1px #6f6c6c; border-left: solid 1px #6f6c6c;" width="2%">7</td>
                <td align="left" valign="middle" style="padding: 5px 0; border-bottom: solid 1px #6f6c6c; border-left: solid 1px #6f6c6c;" width="10%">'.@$resw4formdata["employee_additional_amount"].'</td>
            </tr>

            </table>


            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;<strong style="font-weight: bold;">7</strong>&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="86%">I claim exemption from withholding for 2017, and I certify that I meet
<strong style="font-weight: bold;">both</strong>
of the following conditions for exemption.<br/>
<strong style="font-weight: bold;">•</strong> Last year I had a right to a refund of
<strong style="font-weight: bold;">all</strong>
federal income tax withheld because I had
<strong style="font-weight: bold;">no</strong>
tax liability,
<strong style="font-weight: bold;">and</strong><br/>
<strong style="font-weight: bold;">• </strong> This year I expect a refund of
<strong style="font-weight: bold;">all</strong>
federal income tax withheld because I expect to have
<strong style="font-weight: bold;">no</strong>
tax liability.</td>

                <td align="left" valign="middle" style="padding: 5px 0; border-bottom: solid 1px #6f6c6c; border-left: solid 1px #6f6c6c; background-color: #c0c0c0;" width="10%">'.@$resw4formdata["employee_additional_amount_cause"].'</td>
            </tr>

            </table>




<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
            <tr>
                <td align="left" valign="middle" style="padding: 5px 10px;" width="4%">&nbsp;&nbsp;&nbsp;&nbsp;</td>
                <td align="left" valign="middle" style="padding: 5px 20px;" width="74%">If you meet both conditions, write “Exempt” here
<b style="letter-spacing: 5px;">.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.

</b></td>
<td align="center" valign="middle" style="padding: 5px 0; border-bottom: solid 1px #6f6c6c; border-left: solid 1px #6f6c6c;  border-top: solid 1px #6f6c6c;" width="2%">7</td>
                <td align="left" valign="middle" style="padding: 5px 0; border-bottom: solid 1px #6f6c6c; border-left: solid 1px #6f6c6c; border-top: solid 1px #6f6c6c;" width="20%">'.@$resw4formdata["employee_tax_aility_7"].'</td>
            </tr>

            </table>



            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 20px;">
            <tr>
               <td align="left" valign="middle" height="20px" style="padding: 5px 0; border-top: solid 1px #000; " width="100%">Under penalties of perjury, I declare that I have examined this certificate and, to the best of my knowledge and belief, it is true, correct, and complete.</td>
            </tr>

            </table>
<br/><br/>

 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom: solid 1px #000; font-size: 9px;">
           <tr>
               <td align="left" valign="bottom" width="80%"><strong style="font-size: 10px;">Employee’s signature  </strong><br/>

                   (This form is not valid unless you sign it.)<strong>
                       <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/demoh1arrow2.jpg" width="6px;" />';$html2=@$resw4formdata["employee_signature"].'</strong>';


$html3='</td>
               <td align="left" valign="bottom" width="20%">
               <br/><br/>
                   <strong style="font-size: 10px;">Date
                       <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/demoh1arrow2.jpg" width="6px;" />'.@$resw4formdata["employee_signature_date"].'</strong>



               </td>

           </tr>
       </table>


        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom: solid 2px #000; font-size: 9px;" >
           <tr>
               <td align="left" valign="top" width="55%;">&nbsp;&nbsp;<strong>8</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                   Employer’s name and address (Employer: Complete lines 8 and 10 only if sending to the IRS.)
                   <br/>'.@$resw4formdata["employer_name_address"].'<br/>
               </td>
               <td width="20%;" align="left" valign="top" style="border-left: solid 1px #929292;  border-right: solid 1px #929292;">&nbsp;&nbsp;<strong>9</strong>
                   Office code (optional) <br/>'.@$resw4formdata["employer_office_code"].'<br/></td>
               <td  width="25%;" align="left" valign="top">&nbsp;&nbsp;<strong>10</strong>
                   Employer identification number (EIN
                   ) <br/>'.@$resw4formdata["employer_ein"].'<br/></td>
           </tr>

       </table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: solid 2px #000; font-size: 9px;" >
           <tr>
               <td align="left" valign="top" width="55%;">&nbsp;&nbsp;<strong style="font-size: 10px;">For Privacy Act and Paperwork Reduction Act Notice, see page 2.</strong>
               </td>
               <td width="20%;" align="left" valign="top">&nbsp;&nbsp;<span>Cat. No. 10220Q</span></td>
               <td  width="25%;" align="right" valign="top">&nbsp;&nbsp;Form
<strong style="font-size: 14px;">W-4</strong>
 (2017) </td>
           </tr>

       </table>



               <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 20px;" >
       <tr>
           <td align="left" valign="top"  height="20px">Form W-4 (2017)</td>
           <td align="right" valign="top"  height="20px">Page <strong  style="font-size: 11px;">2</strong> </td>

       </tr>
   </table>








   <table width="100%" border="0" cellspacing="0" cellpadding="0" style=" border: solid 2px #000;" >
       <tr>
           <td align="center" valign="top" width="100%" style=" border: solid 2px #000;" >

<!------------------------------>



<table width="100%" border="0" cellspacing="0" cellpadding="0"  ><tr><td align="center" valign="top" width="100%" style="font-size: 12px; font-weight: bold; border-bottom: solid 2px #000;" >Deductions and Adjustments Worksheet</td> </tr> </table>


    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>
               <td align="left" valign="top" width="80%" >&nbsp;&nbsp;&nbsp;<strong>Note:</strong>
                   Use this worksheet
                   only
                   if you plan to itemize deductions or claim certain credits or adjustments to income</td>
               <td align="left" valign="top" width="20%" >&nbsp;</td>

           </tr>
       </table>





    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">1</strong></td>

               <td align="left" valign="top" width="75%" >Enter
an
estimate
of
your
2017
itemized
deductions.
These
include
qualifying
home
mortgage
interest,
charitable
contributions,
state
and
local
taxes,
medical
expenses
in excess
of
10%
of
your
income,
and
miscellaneous
deductions.
For
2017,
you
may
have
to
reduce
your
itemized
deductions
if your
income
is over
$
313,800
 and
you’re
married
filing
jointly
or
you’re
a qualifying
widow(er);
$
287,650
if you’re
head
of
household;
$
261,500
 if you’re
single,
not
head
of
household
and
not
a qualifying
widow(er);
or
$
156,900
 if you’re
married filing separately. See Pub. 505 for details
.
.
.
.
</td>
 <td align="left" valign="bottom" width="2%" ><br/><br/><br/><br/><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">1</strong> </td>
 <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">
<br/><br/><br/><br/><br/>$'.@$resw4formdata["da_1"].'</td>

           </tr>
       </table>






 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold; line-height: 40px;">2</strong></td>
 <td align="left" valign="middle" width="5%"  style="line-height: 40px;">Enter:</td>
<td align="left" valign="middle" width="3%"><img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/fw4_img1.jpg" /></td>

               <td align="left" valign="top" width="50%" >$
12,700
 if married filing jointly or qualifying widow(er)<br/>
$
9,350
 if head of household  <br/>
 $
6,350
 if single or married filing separately

 </td>

 <td align="left" valign="middle" width="3%"> <img src="http://nexmedsolutions.net/system/themes/nexmedicalbackend/images/fw4_img2.jpg" /> </td>
 <td align="left" valign="middle" width="14%" style="line-height: 40px;"> <b style="letter-spacing: 5px;">...</b></td>
 <td align="left" valign="bottom" width="2%" ><br/><br/><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">2</strong> </td>
 <td align="left" valign="bottom" width="16%">

<br/><br/>
 <div style="border-bottom: solid 2px #000;">$'.@$resw4formdata["da_2"].'</div> &nbsp;&nbsp;</td>

           </tr>
       </table>



<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">3</strong></td>

               <td align="left" valign="top" width="75%" ><strong>Subtract </strong>
line 2 from line 1. If zero or less, enter “-0-”
<span style="letter-spacing: 5px;">.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.</span></td>
 <td align="left" valign="bottom" width="2%" >&nbsp;&nbsp;<strong style="font-weight: bold;">3</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;">

$'.@$resw4formdata["da_3"].'</td>


           </tr>
       </table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><br/><strong style="font-weight: bold;">4</strong></td>

               <td align="left" valign="top" width="75%" ><br/>Enter an estimate of your 2017 adjustments to income and any additional standard deduction (see Pub. 505)</td>
 <td align="left" valign="bottom" width="2%" ><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">4</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;">

<span >$'.@$resw4formdata["da_4"].'</span> &nbsp;&nbsp;</td>

           </tr>
       </table>







      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">5</strong></td>

               <td align="left" valign="top" width="75%" ><strong style="font-weight: bold;">Add </strong>
lines
3  and
4  and
enter
the
total.
(Include
any
amount
for
credits
from
the
Converting
Credits
to
Withholding Allowances for 2017 Form W-4
 worksheet
in Pub. 505.)
<span style="letter-spacing: 5px;">.
.
.
.
.
.
.
.
.
.
.
.
.
.
.</span></td>
 <td align="left" valign="bottom" width="2%" ><br/><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">5</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;">

<br/><br/>$'.@$resw4formdata["da_5"].'</td>

           </tr>
       </table>



<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><br/><strong style="font-weight: bold;">6</strong></td>

               <td align="left" valign="top" width="75%" ><br/>Enter an estimate of your 2017 nonwage income (such as dividends or interest)
.
.
.
.
.
.
.
.</td>
 <td align="left" valign="bottom" width="2%" ><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">6</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;">

<span >$'.@$resw4formdata["da_6"].'</span> &nbsp;&nbsp;</td>

           </tr>
       </table>





<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><br/><strong style="font-weight: bold;">7</strong></td>

               <td align="left" valign="top" width="75%" ><br/><strong style="font-weight: bold;">Subtract</strong>
line 6 from line 5. If zero or less, enter “-0-”
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.</td>
 <td align="left" valign="bottom" width="2%" ><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">7</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;">

<span >$'.@$resw4formdata["da_7"].'</span> &nbsp;&nbsp;</td>

           </tr>
       </table>






       <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><br/><strong style="font-weight: bold;">8</strong></td>

               <td align="left" valign="top" width="75%" ><br/><strong style="font-weight: bold;">Divide </strong>
the amount on line 7 by $
4,050
 and enter the result here. Drop any fraction
.
.
.
.
.
.
.</td>
 <td align="left" valign="bottom" width="2%" ><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">8</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;"> '.@$resw4formdata["da_8"].'

 &nbsp;&nbsp;</td>

           </tr>
       </table>


        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><br/><strong style="font-weight: bold;">9</strong></td>

               <td align="left" valign="top" width="75%" ><br/>
Enter the number from the
<strong style="font-weight: bold;">Personal Allowances Worksheet,</strong>
line H, page 1
.
.
.
.
.
.
.
.
.</td>
 <td align="left" valign="bottom" width="2%" ><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">9</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;"> '.@$resw4formdata["da_9"].'

 &nbsp;&nbsp;</td>

           </tr>
       </table>




        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><br/><strong style="font-weight: bold;">10</strong></td>

               <td align="left" valign="top" width="75%" ><br/>
<strong style="font-weight: bold;">Add</strong>
lines
8 and
9 and
enter
the
total
here.
If you
plan
to
use
the
<strong style="font-weight: bold;">Two-Earners/Multiple
Jobs
Worksheet,</strong>
also enter this total on line 1 below. Otherwise,
<strong style="font-weight: bold;">stop here</strong>
and enter this total on Form W-4, line 5, page 1</td>
 <td align="left" valign="bottom" width="2%" ><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">10</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;"> '.@$resw4formdata["da_10"].'

 &nbsp;&nbsp;</td>

           </tr>
       </table>





<table width="100%" border="0" cellspacing="0" cellpadding="0"  ><tr><td align="center" valign="top" width="100%" style="font-size: 12px;  border-top: solid 2px #000; border-bottom: solid 2px #000;" ><strong style="font-weight: bold;">Two-Earners/Multiple Jobs Worksheet</strong>
<sapn style="font-weight: normal;">(See
<i>Two earners or multiple jobs</i>
on page 1.) </sapn></td> </tr> </table>



<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>
               <td align="left" valign="top" width="80%" >&nbsp;&nbsp;&nbsp;<strong>Note:</strong>
                   Use this worksheet
only
if the instructions under line H on page 1 direct you here.</td>
               <td align="left" valign="top" width="20%" >&nbsp;</td>

           </tr>
       </table>


 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><br/><strong style="font-weight: bold;">1</strong></td>

               <td align="left" valign="top" width="75%" ><br/>
Enter the number from line H, page 1 (or from line 10 above if you used the
<strong style="font-weight: bold;">Deductions and Adjustments Worksheet</strong>
)</td>
 <td align="left" valign="bottom" width="2%" ><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">1</strong> </td>
 <td align="left" valign="bottom" width="16%" style="border-bottom: solid 2px #000;">'.@$resw4formdata["mj_1"].'

 &nbsp;&nbsp;</td>

           </tr>
       </table>



        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><br/><strong style="font-weight: bold;">2</strong></td>

               <td align="left" valign="top" width="75%" ><br/>
Find
the
number
in
<strong style="font-weight: bold;">Table</strong>
1
below
that
applies
to
the
<strong style="font-weight: bold;">LOWEST</strong>
paying
job
and
enter
it here.
<strong style="font-weight: bold;">However,</strong>
if
you
are
married
filing
jointly
and
wages
from
the
highest
paying
job
are
$65,000
or
less,
do
not
enter
more
than “3”
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
</td>
 <td align="left" valign="bottom" width="2%" ><br/><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">2</strong> </td>
 <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">'.@$resw4formdata["mj_1"].'
 &nbsp;&nbsp;</td>

           </tr>
       </table>




 <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">3</strong></td>

               <td align="left" valign="top" width="75%" >
If  line
1  is
<strong style="font-weight: bold;">more
than
or
equal
to</strong>
line
2,
subtract
line
2  from
line
1.
Enter
the
result
here
(if
zero,
enter
“-0-”) and on Form W-4, line 5, page 1.
<strong style="font-weight: bold;">Do not</strong>
use the rest of this worksheet
.
.
.
.
.
.
.
.
.
</td>
 <td align="left" valign="bottom" width="2%" ><br/><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">3</strong> </td>
  <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">'.@$resw4formdata["mj_3"].'
 &nbsp;&nbsp;</td>

           </tr>
       </table>



     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>
               <td align="left" valign="top" width="80%" >&nbsp;&nbsp;&nbsp;<strong>Note:</strong>
                  If line 1 is
 <strong>less than </strong>
line 2, enter “-0-” on Form W-4, line 5, page 1. Complete lines 4 through 9 below to  figure the additional<br/>
&nbsp;&nbsp;&nbsp;withholding amount necessary to avoid a year-end tax bill.    </td>
               <td align="left" valign="top" width="20%" >&nbsp;</td>

           </tr>
       </table>



<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">4</strong></td>

               <td align="left" valign="top" width="75%" >
Enter the number from line 2 of this worksheet
.
.
.
.
.
.
.
.
.
.
</td>
 <td align="left" valign="bottom" width="2%" >&nbsp;&nbsp;<strong style="font-weight: bold;">4</strong> </td>
 <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">'.@$resw4formdata["mj_4"].'
 &nbsp;&nbsp;</td>

           </tr>
       </table>

<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">5</strong></td>

               <td align="left" valign="top" width="75%" >
Enter the number from line 1 of this worksheet
.
.
.
.
.
.
.
.
.
.
</td>
 <td align="left" valign="bottom" width="2%" >&nbsp;&nbsp;<strong style="font-weight: bold;">5</strong> </td>
 <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">'.@$resw4formdata["mj_5"].'
 &nbsp;&nbsp;</td>

           </tr>
       </table>





       <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">6</strong></td>

               <td align="left" valign="top" width="75%" >
<strong style="font-weight: bold;">Subtract</strong>
line 5 from line 4
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
</td>
 <td align="left" valign="bottom" width="2%" >&nbsp;&nbsp;<strong style="font-weight: bold;">6</strong> </td>
 <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">'.@$resw4formdata["mj_6"].'
 &nbsp;&nbsp;</td>

           </tr>
       </table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">7</strong></td>

               <td align="left" valign="top" width="75%" >
Find the amount in
<strong style="font-weight: bold;">Table 2</strong>
below that applies to the
<strong style="font-weight: bold;">HIGHEST</strong>
paying job and enter it here
.
.
.
.
</td>
 <td align="left" valign="bottom" width="2%" >&nbsp;&nbsp;<strong style="font-weight: bold;">7</strong> </td>
 <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">
 $'.@$resw4formdata["mj_7"].'</td>

           </tr>
       </table>



       <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">8</strong></td>

               <td align="left" valign="top" width="75%" >
<strong style="font-weight: bold;">Multiply</strong>
line 7 by line 6 and enter the result here. This is the additional annual withholding needed
.
.
</td>
 <td align="left" valign="bottom" width="2%" >&nbsp;&nbsp;<strong style="font-weight: bold;">8</strong> </td>
 <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">
 $'.@$resw4formdata["mj_8"].'</td>

           </tr>
       </table>




       <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px; line-height: 12px;"  >
           <tr>

             <td align="center" valign="top" width="5%" ><strong style="font-weight: bold;">9</strong></td>

               <td align="left" valign="top" width="75%" >
Divide
line
8 by
the
number
of
pay
periods
remaining
in 2017.
For
example,
divide
by
25
if you
are
paid
every
two
weeks
and
you
complete
this
form
on
a date
in January
when
there
are
25
pay
periods
remaining
in 2017.
Enter
the result here and on Form W-4, line 6, page 1. This is the additional amount to be withheld from each paycheck
</td>
 <td align="left" valign="bottom" width="2%" ><br/><br/><br/>&nbsp;&nbsp;<strong style="font-weight: bold;">9</strong> </td>
 <td align="left" valign="bottom" width="16%"  style="border-bottom: solid 2px #000;">
<br/><br/><br/> $'.@$resw4formdata["mj_9"].'</td>

           </tr>
       </table>




<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000;"> <strong style="font-size: 12px;">Table 1</strong></td>
<td  style="border-left: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000;"> <strong style="font-size: 12px;">Table 2</strong></td>
</tr><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td style="border-left: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000;"> <strong style="font-size: 10px;">Married Filing Jointly </strong></td>
<td style="border-left: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000;"> <strong style="font-size: 10px;"> All Others </strong></td>
</tr><tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td  style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 9px;">If wages from
                                   <strong>LOWEST</strong>
                                   paying job are—</td>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 9px;">Enter on
                                   line 2 above</td>
                           </tr>
                           <tr>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 8px; height: 170px;">
                                   $0  -    $7,000<br/>
                                  7,001
                                       -    14
                                       ,000<br/>

                                  14,001
                                       -    22
                                       ,000<br/>

                                 22,001
                                       -    27
                                       ,000<br/>

                                  27,001
                                       -    35
                                       ,000<br/>

                                  35,001
                                       -    44
                                       ,000<br/>


                                  44,001
                                       -    55
                                       ,000<br/>


                                   55,001
                                       -    65
                                       ,000<br/>

                                 65,001
                                       -    75
                                       ,000<br/>


                                  75,001
                                       -    80
                                       ,000<br/>

                                   80,001
                                       -    95
                                       ,000<br/>

                                    95,001
                                       -  115
                                       ,000<br/>

                                  115,001
                                       -  130
                                       ,000<br/>

                                  130,001
                                       -  140
                                       ,000<br/>


                                   140,001
                                       -  150
                                       ,000<br/>

                                150,001
                                       and ove

                               </td>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 8px; height: 170px;">
                                  0<br/>
                                  1<br/>
                                   2<br/>
                                  3<br/>
                                   4<br/>
                                  5<br/>
                                  6<br/>
                                  7<br/>
                                   8<br/>
                                   9<br/>
                                  10<br/>
                                  11<br/>
                                  12<br/>
                                 13<br/>
                                   14<br/>
                                   15


                               </td>
                           </tr>
                       </table>


                   </td>
                   <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                           <tr>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 9px;">If wages from
                                   <strong>LOWEST</strong>
                                   paying job are—</td>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 9px;">Enter on
                                   line 2 above</td>
                           </tr>
                           <tr>
                              <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 8px; height: 170px;">

                                   $0  -    $8
                                       ,000<br/>

                                  8,001
                                       -    16
                                       ,000<br/>

                                  16,001
                                       -    26
                                       ,000<br/>

                                  26,001
                                       -    34
                                       ,000<br/>

                                   34,001
                                       -    44
                                       ,000<br/>


                                  44,001
                                       -    70
                                       ,000<br/>

                                   70,001
                                       -    85
                                       ,000<br/>


                                 85,001
                                       -  110
                                       ,000<br/>


                                   110,001
                                       -  125
                                       ,000<br/>


                                   125,001
                                       -  140
                                       ,000<br/>


                                   140,001
                                       and ove

                               </td>


                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 8px; height: 170px;">

                                0<br/>
                                   1<br/>
                                2<br/>
                                   3<br/>
                                   4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10
                               </td>
                           </tr>
                       </table></td>
               </tr>
           </table>


       </td>


       <td><table width="100%" border="0" cellspacing="0" cellpadding="0" >
               <tr>
                   <td style="border-left: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000;"> <strong style="font-size: 10px;">Married Filing Jointly </strong></td>
                   <td style="border-left: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000;"> <strong style="font-size: 10px;">All Others </strong></td>
               </tr>
               <tr>
                   <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                           <tr>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 9px;">If wages from
                                   <strong>HIGHEST</strong>
                                   paying job are—</td>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 9px;">Enter on
                                   line 7 above</td>
                           </tr>
                           <tr>
                              <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 8px; height: 170px;">
                                   $0  -  $
                                       75,00<br/>
                                    75,001
                                       -
                                       135,000<br/>

                                   135,001
                                       -
                                       205,000<br/>

                                   205,001
                                       -
                                       360,000<br/>

                                   360,001
                                       -
                                       405,000<br/>

                                   405,001
                                       and over

                               </td>
                              <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 8px; height: 170px;">
                                   $610<br/>
                                   1,010<br/>
                                   1,130<br/>
                                   1,340<br/>
                                   1,420<br/>
                                   1,600

                               </td>
                           </tr>
                       </table></td>
                   <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                           <tr>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 9px;">If wages from
                                   <strong>HIGHEST</strong>
                                   paying job are—</td>
                               <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 9px;">Enter on
                                   line 7 above</td>
                           </tr>
                           <tr>
                                <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 8px; height: 170px;">
                                $0  -  $
                                       38,000<br/>

                                  38,001
                                       -
                                       85,000<br/>

                                 85,001
                                       -
                                       185,000<br/>

                                 185,001
                                       -
                                       400,000<br/>

                                400,001
                                       and ove

                               </td>
                                <td style="border-right: solid 1px #000; border-top: solid 1px #000; border-bottom: solid 1px #000; font-size: 8px; height: 170px;">
                                   $610<br/>
                                   1,010<br/>
                                  1,130<br/>
                                   1,340<br/>
                                   1,600

                               </td>
                           </tr>
                       </table></td>
               </tr>
           </table></td>
       </tr>
       </table>

<!------------------------------>
</td>

</tr>

   </table>


<table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 9px;">
       <tr>
           <td align="left" valign="top" width="48%"><strong>Privacy Act and Paperwork Reduction Act Notice.</strong>
               We ask for the information on this
               form
               to carry out the Internal Revenue laws of the United States. Internal Revenue Code
               sections
               3402(f)(2) and 6109 and their regulations require you to provide this
               information; your employer
               uses it to determine your federal income tax withholding.
               Failure to provide a properly
               completed form will result in your being treated as a single
               person who claims no withholding
               allowances; providing fraudulent information may
               subject you to penalties. Routine uses of
               this information include giving it to the
               Department of Justice for civil and criminal litigation; to
               cities, states, the District of
               Columbia, and U.S. commonwealths and possessions for use in
               administering their tax
               laws; and to the Department of Health and Human Services for use in
               the National Directory of New Hires. We may also disclose this
               information to other countries
               under a tax treaty, to federal and state agencies to
               enforce federal nontax criminal laws, or to
               federal law enforcement and intelligence
               agencies to combat terrorism.</td>
                <td align="left" valign="top" width="4%">&nbsp;</td>
           <td align="left" valign="top" width="48%">

               You are not required to provide the information requested on a form that is
               subject to the Paperwork Reduction Act unless the form displays a valid OMB
               control number. Books or records relating to a form or its instructions must be
               retained as long as their contents may become material in the administration of
               any Internal Revenue law. Generally, tax returns and return information are
               confidential, as required by Code section 6103.<br/><br/>
               The average time and expenses required to complete and file this form will vary
               depending on individual circumstances. For estimated averages, see the
               instructions for your income tax return.<br/><br/>
               If you have suggestions for making this form simpler, we would be happy to hear
               from you. See the instructions for your income tax return

           </td>
       </tr>
   </table>



</div>




';

// output the HTML content
//$pdf->writeHTML($html, true, 0, true, true);
$pdf->writeHTML($html);
$fontname = TCPDF_FONTS::addTTFfont('includes/plugins/html2pdf/tcpdf/fonts/Notera_PersonalUseOnly.ttf', 'TrueTypeUnicode', '', 30);

//$pdf->SetFont($fontname, '', 11, '', false);
//$pdf->SetY(155);
//$pdf->writeHTML($html2);
//$pdf->writeHTML($html2, true, 0, true, true);
$pdf->SetLeftMargin(8);
$pdf->SetRightMargin(8);

//$pdf->SetY(165);
//$pdf->SetFont('helvetica');
//$pdf->SetFont('helvetica');
$pdf->writeHTML($html.$html2.$html3);
//$pdf->SetY(2);
// reset pointer to the last page
$pdf->lastPage();

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output('fw4.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
