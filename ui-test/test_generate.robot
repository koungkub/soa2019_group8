*** Settings ***

Library  SeleniumLibrary


*** Variables ***
${Browser}   Chrome
${URL}       https://soa-fron2staff.herokuapp.com/

*** Test Cases ***
Generate Code Sucess
    Open Browser    ${URL}  ${Browser}
    Maximize Browser Window
    Click Element  name:intro
    Sleep          2s
    Input Text     name:name  Studio7
    Input Text     name:price  1200
    Click Element  name:submitcode
    Sleep          2s

Reset and Geneerate Error
    Go To          https://soa-fron2staff.herokuapp.com/
    Click Element  name:intro
    Sleep          2s
    Input Text     name:name  Studio14
    Input Text     name:price  3620
    Sleep          2s
    Click Element  name:reset
    Sleep          2s
    Click Element  name:submitcode




