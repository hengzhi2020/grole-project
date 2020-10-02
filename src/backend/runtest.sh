ii=1
while read -r line; 
do 
    echo "TEST $ii:";
    echo $line; 
    sleep 1; 
    eval $line;  
    ((ii=ii+1))
done < curl_test.sh
