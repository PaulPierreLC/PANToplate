var selection = "";
var i = 0;

for(var i = 0; i < 23; i++)
{
    var j = zeroFill(i, 2);
    selection += "<option value='"+ j +"00'>"+ j + ":00" + "</option>";
    selection += "<option value='"+ j +"30'>"+ j + ":30" + "</option>";
}
$("select").html(selection);

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}