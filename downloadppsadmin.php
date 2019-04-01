<?php
/**
 * Created by PhpStorm.
 * User: INFLUXIQ-01
 * Date: 16-08-2018
 * Time: 02:24 PM
 */

if( $_SERVER['HTTP_REFERER']!='http://localhost:4200/' && $_SERVER['HTTP_REFERER']!='https://greenvalleyportal.com/'){
  header('Location: '.'https://greenvalleyportal.com/');

}
else{

  header('Location: '.'https://greenvalleyportal.com/testpdf/html2pdf/pps_symptom_pgx.php?id='.$_REQUEST['id']);

}
