#!/bin/bash\
#*package.json
axios="axios-0.21.4.tgz"
bootstrap="bootstrap-4.5.0.tgz"
chartjs="chart.js-3.9.1.tgz"
history="history-4.10.1.tgz"
immer="immer-9.0.21.tgz"
react="react-16.13.1.tgz"
reactchartjs2="react-chartjs-2-3.3.0.tgz"
reactcircularprogressbar="react-circular-progressbar-2.1.0.tgz"
reactdom="react-dom-16.13.1.tgz"
reactexcelrenderer="react-excel-renderer-1.1.0.tgz"
reacthtmltabletoexcel="react-html-table-to-excel-2.0.0.tgz"
reactliquidgauge="react-liquid-gauge-0.5.1.tgz"
reactrouter="react-router-5.2.0.tgz"
reactrouterdom="react-router-dom-5.2.0.tgz"
reactscripts="react-scripts-5.0.1.tgz"
reactselect="react-select-5.7.2.tgz"
reactsimpletreemenu="react-simple-tree-menu-1.1.18.tgz"
reactspinners="react-spinners-0.13.8.tgz"
reacttable="react-table-7.8.0.tgz"
reacttoastify="react-toastify-7.0.4.tgz"
reacttogglebutton="react-toggle-button-2.2.0.tgz"
reactstrap="reactstrap-8.4.1.tgz"
shortid="shortid-2.2.16.tgz"
webpack="webpack-4.42.0.tgz"
xlsx="xlsx-0.18.5.tgz"
#*script ----------------------------------------------------------------
echo "$PWD"
origin="$PWD"
cd tarballs
# echo "$(ls)"
paths="$(ls)"
# echo "$paths"
arr=()
arrF=()
src=()
count=0

for var in $paths
 do
    cd $var
    arr+=([$count]=$(ls))
    count=$[ $count + 1 ]
    cd ..
 done
#  echo -e ${arr[0]}
#  echo -e ${arr[0]}
 cd ..

#  for str in ${arr[@]}
#  do
#     echo -e $str
# done
#  echo -e "$PWD"
countF=0
for var in ${arr[@]}
do
    if [[ $var == $axios ]] 
    then
    arrF+=([$countF]="axios/""$var")
    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $bootstrap ]] 
    then
    arrF+=([$countF]=""bootstrap/""$var)
    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $chartjs ]] 
    then
    arrF+=([$countF]="chart.js/""$var")
    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $history ]] 
    then
    arrF+=([$countF]="history/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $immer ]] 
    then
    arrF+=([$countF]="immer/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $react ]] 
    then
    arrF+=([$countF]="react/"$var)

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactchartjs2 ]] 
    then
    arrF+=([$countF]="react-chartjs-2/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactcircularprogressbar ]] 
    then
    arrF+=([$countF]="react-circular-progressbar/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactdom ]] 
    then
    arrF+=([$countF]="react-dom/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactexcelrenderer ]] 
    then
    arrF+=([$countF]="react-excel-renderer/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reacthtmltabletoexcel ]] 
    then
    arrF+=([$countF]="react-html-table-to-excel/""$var")
    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactliquidgauge ]] 
    then
    arrF+=([$countF]="react-liquid-gauge/""$var")
    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactrouter ]] 
    then
    arrF+=([$countF]="react-router/"$var)

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactrouterdom ]] 
    then
    arrF+=([$countF]="react-router-dom/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactscripts ]] 
    then
    arrF+=([$countF]="react-scripts/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactselect ]] 
    then
    arrF+=([$countF]="react-select/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactsimpletreemenu ]] 
    then
    arrF+=([$countF]="react-simple-tree-menu""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactspinners ]] 
    then
    arrF+=([$countF]="react-spinners/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reacttable ]] 
    then
    arrF+=([$countF]="react-table/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reacttoastify ]] 
    then
    arrF+=([$countF]="react-toastify/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reacttogglebutton ]] 
    then
    arrF+=([$countF]="react-toggle-button/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $reactstrap ]] 
    then
    arrF+=([$countF]="reactstrap/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $shortid ]] 
    then
    arrF+=([$countF]="shortid/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $webpack ]] 
    then
    arrF+=([$countF]="webpack/""$var")

    countF=$[ $countF + 1 ]
    fi
    if [[ $var == $xlsx ]] 
    then
    arrF+=([$countF]="xlsx/""$var")

    countF=$[ $countF + 1 ]
    fi
done


 for str in ${arrF[@]}
 do
    temp=${str%%-}
    # echo -e "./tarballs""/$str"
    npm i "./tarballs""/$str" --force
done
