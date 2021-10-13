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


function remove_requirement(elem){
    $(elem).parent('div').parent('div').parent('div').parent('div').remove();
}


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

  for (i = 0; i <emp_tot; i++)
  {
    document.getElementById("container").innerHTML +='<div class="cards '+employee[i].role+'">'
      +'<div class="ImageBox">'
        +'<img src="images/Images ('+(i+1)+').jpg" alt="">'
      +'</div>'
      +'<div class="award">'
      +'<div class="content">'
        +'<div class="details">'
          +'<h2>'+employee[i].name+'<h2><span class="pill">'+employee[i].role+'</span>&emsp;<span class="pill">'+employee[i].location+'</span>'
          +'<ul class="social_icons">'
            +'<li><a href="https://arkadesignstudio.in/assets/img/Arka%20Resume.pdf" target="_blank"><i class="far fa-file"></i></a></li>'
            +'<li><a href="https://www.behance.net/arkamajhi" target="_blank"><i class="fab fa-behance"></i></a></li>'
            +'<li><a href="mailto:arka.majhi@iitb.ac.in" target="_blank"><i class="far fa-envelope"></i></a></li>'
            +'<li><a href="https://wa.me/918910689698" target="_blank"><i class="fab fa-whatsapp"></i></a></li>'
          +'</ul>'
        +'</div>'
      +'</div>'
    +'</div>'
    ;
  }

  for (i = 0; i <getRndInteger(15, 30); i++)
  {
    role=roles[getRndInteger(0, roles.length-1)];
    reqd_no=getRndInteger(1, 6);
    loc=locations[getRndInteger(0, locations.length-1)];
    document.getElementById("project_container").innerHTML +=
    '<div class="cards '+role+'">'
      +'<div class="project">'
        +'<h2>'+role+' Designer</h2>'
        +'<h1>'+reqd_no+'</h1>Required'
        +'<br><br>'
        +'<i class="fas fa-map-marker-alt"></i> '+loc
      +'</div>'
      +'<div class="overlay">'
        +'<div class="overlay_content">'
          +'<i class="fas fa-user-plus icon"></i>'
          +'<br><br>Click here or<br>'
          +'Drag and Drop'
          +'<br>Employee Profiles<br><br>'
          +'<div><button class="icon" onClick="remove_requirement(this)">Send <i class="fas fa-paper-plane"></i></button></div>'
        +'</div>'
      +'</div>'
    +'</div>'
    ;
  }

})
