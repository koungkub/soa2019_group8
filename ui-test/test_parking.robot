*** Settings ***

Library  SeleniumLibrary


*** Variables ***
${Browser}   Chrome
${URL}       https://soa-front.herokuapp.com

*** Test Cases ***
Running with 2 discount
    Open Browser    ${URL}  ${Browser}
    Maximize Browser Window
    Click Element  name:goInside
    Sleep          5s
Select QR picture
    Click Element  name:cameralegacy

Submit discount code 1
     Sleep          10s
     Click Element  name:discountBtn
     Sleep          5s
     Input Text     name:codeTextInput  SWFH7w
     Sleep          5s
     Click Element  submitDiscountBtn
Submit discount code 2
     Sleep          5s
     Click Element  name:discountBtn
     Sleep          5s
     Input Text     name:codeTextInput  hT1qDV
     Sleep          5s
     Click Element  submitDiscountBtn
payment
     Sleep          5s
     Click Element  name:paymentBtn
     Sleep          5s
     Click Element  name:confirmDialogBtn
sign out
     Sleep          8s
     Click Element  name:signoutBtn
