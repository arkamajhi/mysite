$(document).ready(function()
{
  $('.list').click(function(){
    const value=$(this).attr('data-filter');
    if (value=='All')
    {
      $('.employeebox').show('1000');
    }
    else
    {
      $('.employeebox').not('.'+value).hide('1000');
      $('.employeebox').filter('.'+value).show('1000');
    }
  })
  //add active class on selected item
  $('.list').click(function()
  {
    $(this).addClass('active').siblings().removeClass('active');
  })
})
