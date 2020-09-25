while read -r line; 
do 
    echo "NEXT TEST:";
    echo $line; 
    sleep 5; 
    eval $line;  
done < curl_test.sh
