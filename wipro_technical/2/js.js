names=[
"Mulkraj Shashwat",
"Maheshwar Shivaprakash",
"Utkarsha Mahanthapa",
"Vidyadhar Vandita",
"Parmameshwar Kasavaraju",
"Jagajeevan Gowda",
"Yajat Mittur",
"Vibhat Koothrappally",
"Tripurari Raghavendran",
"Megha Nasir",
"Umanant Sudhanshu",
"Sajal Pankaj",
"Ajitabh Udit",
"Aiman Lecamwasam",
"Pirmohammed Padmanabh",
"Balachandra Panth",
"Mahipal Rajaraman",
"Dindayal Shriharsha",
"Tulsidas Sapna",
"Adhita Viral",
"Sandeepen Uddin",
"Devdutta Shamsher",
"Jaichand Maruthi",
"Vallabh Shally",
"Ashis Keshavan",
"Akram Tikekar",
"Bhaskar Prasad",
"Shaistakhan Nidheesh",
"Sambhav Seshadrinathan",
"Hem Yanamandra"
];

roles=["IxD","UxD","UR","UiD","AN","FE"];

locations=["Bangalore","Hyderabad","Kolkata","Mumbai","Delhi"];

function getRndInteger(min, max)
{
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

emp_tot=30;


data = '[';
for(a=0;a<emp_tot;a++)
{
  data += '{"no":"'+(a+1)+'", "name":"'+names[getRndInteger(0, names.length-1)]+'", "role":"'+roles[getRndInteger(0, roles.length-1)]+'", "location":"'+locations[getRndInteger(0, locations.length-1)]+'"}';
  if(a<emp_tot-1)
  {
    data += ',';
  }
  else
  {
    data += ']';
  }
}
//+'{"no":"1", "name":"'+names[getRndInteger(0, names.length)]+'", "role":"IxD", "location":"Bangalore"},'

console.log(data);





$(document).ready(function()
{
  $('.list').click(function(){
    const value=$(this).attr('data-filter');
    if (value=='All')
    {
      $('.cards').show('1000');
    }
    else
    {
      $('.cards').not('.'+value).hide('1000');
      $('.cards').filter('.'+value).show('1000');
    }
  })
  //add active class on selected item
  $('.list').click(function()
  {
    $(this).addClass('active').siblings().removeClass('active');
  })

  var employee = JSON.parse(data);
  //alert(employee[1].name);

  for (var i = 0; i <emp_tot; i++)
  {
    document.getElementById("container").innerHTML +='<div class="cards '+employee[i].role+'">'
      +'<div class="ImageBox">'
        +'<img src="images/Images ('+(i+1)+').jpg" alt="">'
      +'</div>'
      +'<div class="content">'
        +'<div class="details">'
          +'<h2>'+employee[i].name+'<br><span>'+employee[i].role+'</span></h2>'
          +'<ul class="social_icons">'
            +'<li><a href="#"><i class="far fa-file"></i></a></li>'
            +'<li><a href="#"><i class="fab fa-behance"></i></a></li>'
            +'<li><a href="#"><i class="far fa-envelope"></i></a></li>'
            +'<li><a href="#"><i class="fab fa-whatsapp"></i></a></li>'
          +'</ul>'
        +'</div>'
      +'</div>'
    +'</div>'
    ;
  }
})
