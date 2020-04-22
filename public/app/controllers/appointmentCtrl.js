angular.module('appointmentControllers', [])

//Shopping cart
.controller('appointmentCtrl', function($scope){


    
    
    function add_shoppingcar(btn){
      var tr=btn.parentNode.parentNode;
      var tds=tr.getElementsByTagName("td");
      var name=tds[0].innerHTML;
      var price=tds[1].innerHTML;
      var tbody=document.getElementById("goods");
      var row=tbody.insertRow();
      row.innerHTML="<td>"+name+"</td>"+
    "<td>"+price+"</td>"+
"<td align='center'>"+
    "<input type='button' value='-' id='jian'  onclick='change(this,-1)'  />"+
    "<input id='text' type='text' size='1' value='1' readonly='readonly' />"+
    "<input type='button' value='+' id='add'  onclick='change(this,1)'  />"+
    "</td>"+
    "<td>"+price+"</td>"+
    "<td align='center'>"+
      "<input type='button' value='X' onclick='del(this)'/>"+
    "</td>"+
    "</tr>"
    total();
    }
    //to change the quantity
    function change(btn,n){
    //to get the quantity
    var inputs = btn.parentNode.getElementsByTagName("input");
    //to get the original quantity
    var amount = parseInt(inputs[1].value);
    
    //use n<0 to express we minus the button
    if(amount<=1 && n<0){
  return;
    }
    //change the qty according to plus or minus button
    inputs[1].value = amount + n;
    //combine changed qty with amts
    amount = inputs[1].value;
    //get all rows
    var tr = btn.parentNode.parentNode;
    //get all columns
    var tds = tr.getElementsByTagName("td");
    //get the price
    var price = parseFloat(tds[1].innerHTML);
    
    var m = price * amount;
    
    tds[3].innerHTML = m;
    
    total();
  }

function total(){
      var tbody=document.getElementById("goods");
      var trs=tbody.getElementsByTagName("tr");
      var sum=0;
      for(var i=0;i<trs.length;i++){
        var tds=trs[i].getElementsByTagName("td");
        var m=tds[3].innerHTML;
        sum += parseFloat(m);
      }
      var total=document.getElementById("total");
      total.innerHTML = sum;
    }
    function del(i){
      var tr=i.parentNode.parentNode;
      tr.parentNode.removeChild(tr);
      //tr.remove(tr);
      total();
    }




})