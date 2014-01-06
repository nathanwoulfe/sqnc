<?php
    require_once("fb_php_sdk/src/facebook.php"); // set the right path

    file_put_contents("cron.log", "\r\n/****/\r\nCron called at" . gmDate('Y-m-d\TH:i:s\Z') . "\r\n", FILE_APPEND);

    $url="http://gdata.youtube.com/feeds/base/users/UClY3FU0h5PMTZpQQALwBB3g/newsubscriptionvideos?max-results=50&v=2";
    $xml_string = file_get_contents($url,0,null,null);

    $xml = simplexml_load_string($xml_string);
    $json = json_encode($xml);
    $json_output = json_decode($json);
   
    $latest = $json_output->entry[0];
    $id = substr($latest->id, strpos($latest->id, "video:") + 6);

    // get minutes from last update
    $now = gmDate('Y-m-d\TH:i:s\Z');
    $now_time = strtotime($now);

    $pubDate = $latest->published;
    $pubDate_time = strtotime($pubDate);    
    $minutesSinceUpdate = round(abs($now_time - $pubDate_time) / 60);

    $count = -1;
    foreach ($json_output->entry as $item) {
        $pubDate = $item->published;
        $pubDate_time = strtotime($pubDate);    
        $age = round(abs($now_time - $pubDate_time) / 60);
        if ($age < 240) {
            $count++;
        }        
    }  

    $messageSuffix = "";
    if ($count > 0) {
        $messageSuffix = "PLUS: " . $count . " more new videos since our last update";
    }

    if ($minutesSinceUpdate < 240) {

        $config = array();
        $config['appId'] = '594315730631901';
        $config['secret'] = 'ba12962c5c7aab708b8a96ad9d034e60';
        $config['fileUpload'] = false; // optional
        $fb = new Facebook($config);
    
        $params = array(
            "access_token" => "CAAIchuoCPN0BAHdG88aZAABpwolAsyFHJuaKvjb0CtYY2UmX69hMDbdjPXrgtmFOgSEL2c5eFgPcfnz4nd5RI8CyU9V2H50SpGzT4KpfPL6GG5tXZANzQOiZCflJZAhVILINow7DiqI39maLBgzXU7AbbpYzPaamwKEwskX8o7pFbMZBAqQ7v",
            "message" => "NEW VIDEO: " . $latest->title . " 
                " . $messageSuffix . "
                " . "
                " . "Don't wait for Facebook updates - http://eadg.be",
            "link" => "http://dev.eadg.be/#/v/" . $id,
            "name" => "EADG.Be",
            "caption" => "Guitar videos. Nothing else.",
            "picture" => "http://i.ytimg.com/vi/" . $id . "/0.jpg",
            "description" => "WATCH NOW: " . $latest->title
        );    
        echo '<pre>';
        print_r($params);
        echo '</pre>';
        
        file_put_contents("cron.log", "Found " . $count + 1 . " new items\r\n", FILE_APPEND);

        $errorCount = 0;
        postToFacebook($params, $fb); 
       
    } else {        
        file_put_contents("cron.log", "No new posts found\r\n", FILE_APPEND);
    }

    function postToFacebook($params, $fb) {
        try {
            $ret = $fb->api('/536951096380113/feed', 'POST', $params);
            echo 'Successfully posted to Facebook Fan Page';
            file_put_contents("cron.log",  "Successfully posted to Facebook Fan Page\r\n", FILE_APPEND);
        } catch(Exception $e) {
            
            if ($errorCount < 2) {
                postToFacebook($params, $fb);
                file_put_contents("cron.log",  "Something went wrong, trying again\r\n", FILE_APPEND);
                $errorCount++;
            }
            else {
                $e = str_replace('"', "", $e);
                $e = str_replace("'", "", $e);
                echo 'Error ' . $e;
                file_put_contents("cron.log",  "Something went really wrong: " . $e . "\r\n", FILE_APPEND);
            }   
        }
    }

    file_put_contents("cron.log", "Cron job complete \r\n/****/", FILE_APPEND);
?>