<?php
/**
 * Created by PhpStorm.
 * User: iftekar
 * Date: 30/5/17
 * Time: 1:33 PM
 */

header('Content-type: text/html');
header('Access-Control-Allow-Origin: * ');  //I have also tried the * wildcard and get the same response
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
error_reporting(E_ALL);

$data = json_decode(file_get_contents("php://input"));
//print_r(count($data));
//print_r($data);
//exit;
function callpostagain($data1){


  $data_string = json_encode($data1);
  $d=http_build_query($data1);
  //echo $d;//exit;
  //echo "http://greenvalleyportal.com:3020/" . $_GET['q'].'&'.$d;

  $ch = curl_init("http://greenvalleyportal.com:3020/" . $_GET['q'].'?'.$d);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  /*curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json',
          'Content-Length: ' . strlen($data))
  );*/

  $response= curl_exec($ch);
  echo (($response));
  curl_close($ch);
}

function callgetagain(){
  $curl = curl_init();
  curl_setopt_array($curl, array(
    CURLOPT_URL => "http://greenvalleyportal.com:3020/" . $_GET['q'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",

  ));

  $headers = [];


  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  $response = curl_exec($curl);
  $err = curl_error($curl);
//print_r($err);
//echo "<pre>";
  //print_r(($response));
  echo $response;
}


if(count($data)==0) {
  //echo "http://greenvalleyportal.com:3020/" . $_GET['q'];
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "http://greenvalleyportal.com:3020/apidatawall",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",

    ));

    $headers = [];


  curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
  $response = curl_exec($curl);
  $err = curl_error($curl);
//print_r($err);
//echo "<pre>";
  //print_r(($response));
  $dataarray=json_decode($response);
  //echo "<pre>";
  //print_r((($dataarray->data)));
  //echo "</pre>";
  //print_r((count($dataarray->data)));
  //exit;
  $datarr=[];
  foreach ($dataarray->data as $val){
    //echo "<pre>";
    //print_r($val);
    //print_r($val->prescription);
    //echo $val->_id;
    //$dataval=[];
    $dataval['patientid']=$val->_id;
    $dataval['firstname']=$val->firstname;
    $dataval['lastname']=$val->lastname;
    $dataval['city']=$val->city;
    $dataval['state']=$val->state;
    $dataval['phone']=$val->phone;
    $dataval['dob']=$val->prescription[0]->dob;
    $dataval['address']=$val->prescription[0]->address;
    $dataval['zip']=$val->prescription[0]->zip;
    $dataval['prescriptionid']=$val->prescription[0]->_id;
    $dataval['notes']=$val->notes[0]->note;
    if($val->prescription[0]->allergies_sup==1)$dataval['allergies']='yes'; else $dataval['allergies']='no';
    $datarr[]=$dataval;
    //echo "</pre>";
  }

  //echo "<pre>";
  $datav['status']='success';
  $datav['status']=$datarr;
  print_r(((json_encode($datav))));
  //echo "</pre>";
  exit;
  if(strlen($response)==0) echo $response;
  else callgetagain();

}
else{

    //echo 5;
    $data_string = json_encode($data);
    $d=http_build_query($data);
    //echo $d;//exit;
    //echo "http://greenvalleyportal.com:3020/" . $_GET['q'].'&'.$d;

    $ch = curl_init("http://greenvalleyportal.com:3020/" . $_GET['q'].'?'.$d);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    /*curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data))
    );*/

    $response= curl_exec($ch);
    if(strlen($response)>2)
      echo (($response));
    else callpostagain($data);
    curl_close($ch);


    //print_r($data);
    //exit;
}



//echo "</pre>";
