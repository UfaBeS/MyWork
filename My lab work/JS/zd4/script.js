function getSalary(hours,pph ) {

   zp = document.getElementById("zp").value;
   percent = document.getElementById("percent").value;
   if (zp > 0){
   salary1 = zp * (percent / 100);
   salary2 = zp - salary1;
	}
	else {
		alert('Не может быть отрицательной')
	}
   var Ustax = salary2;
   var Array=[];
   Array=document.getElementById("zp").value;
   document.getElementById("salary").innerHTML="К получению: " + Ustax + " рублей";

  
  return neto;

}
