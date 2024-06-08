const passwordDisplay = document.querySelector(".passwordisply");
const copyedbutton = document.querySelector(".copied");
const copymsz = document.querySelector(".copymsz");

const passwordlength = document.querySelector(".passworlength");
const lengthdisplay =  document.querySelector("[data-lengthslidebar]");

const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symble = document.querySelector("#symble");

const strenghtcolor = document.querySelector(".strenghtcolor");
const generatepassword = document.querySelector(".generatepassword");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symblestr = "!@#$%^&*()}{][:;<>,.`"

let passworrd = "";
let length = 10;
let checkboxcount = 0;
handalslider()
setIndicator("#ccc");

function handalslider(){
    passwordlength.innerText = length;
    // console.log( passwordlength.innerHTML)
    lengthdisplay.value = length;

    const min = lengthdisplay.min;
    const max = lengthdisplay.max;
    lengthdisplay.style.backgroundSize = ( (length - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color) {
    strenghtcolor.style.backgroundColor = color;
    strenghtcolor.style.boxShadow = `0px 0px 12px 1px ${color}`;
    
}


function getRandIntger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function getRandnumber(){
    return getRandIntger(0,9);
}

function getRanduppercase(){
      return String.fromCharCode( getRandIntger(65,91));
}
function getRandlowercase(){
    return String.fromCharCode(getRandIntger(97,123));
}

function getRandsymoble(){
    const randsymble = getRandIntger(0,symblestr.length);
    return symblestr.charAt(randsymble);
}

function calcStrength(){
    let hasLower = false;
    let hasUpper = false;
    let hasNum =  false;
    let hasSym = false;
    
    if(lowercase.checked) hasLower = true;
    if(uppercase.checked) hasUpper = true;
    if(number.checked)  hasNum = true;
    if(symble.checked) hasNum = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && length >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }
} 

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsz.innerText = "copied";
    }
    catch(e) {
        copymsz.innerText = "Failed";
    }
    //to make copy wala span visible
    copymsz.classList.add("active");

    setTimeout( () => {
        copymsz.classList.remove("active");
    },2000);

}

function shufflePassword(array){
    for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    // return str;
    for(let i=0;i<=array.length-1;i++){
        str = str + array[i]
    }
    return str;
}

lengthdisplay.addEventListener("input",function(e){
    length = e.target.value;
    handalslider()
})

copyedbutton.addEventListener("click",function(){
if(passwordDisplay.value){
    copyContent()
}   
});

function handleCheckBoxChange(){
    checkboxcount =0;
 allCheckBox.forEach((checkbox)=>{
 if(checkbox.checked){
    checkboxcount++;
 }
 });

 if(checkboxcount > length){
    length = checkboxcount;
    handalslider();
 }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckBoxChange);
})

generatepassword.addEventListener("click",()=>{

    if( checkboxcount==0) return;

    if(checkboxcount > length){
        length = checkboxcount;
        handalslider();
     }

    passworrd ="";

    let funcArr = [];
    if(uppercase.checked){
        funcArr.push(getRanduppercase);
    }
    if(lowercase.checked){
        funcArr.push(getRandlowercase);
    }
    if(number.checked){
        funcArr.push(getRandnumber);
    }
    if(symble.checked){
        funcArr.push(getRandsymoble);
    }

    
    for(let i=0; i<funcArr.length; i++) {
        passworrd += funcArr[i]();
    }

   
    for(let j=0; j<length-funcArr.length; j++) {
        let randIndex = getRandIntger(0 , funcArr.length);
        passworrd += funcArr[randIndex]();  
       
    } 
    
     passworrd = shufflePassword(Array.from(passworrd));
    

    passwordDisplay.value = passworrd;
    calcStrength()
    
})



