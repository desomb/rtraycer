function	rotation_x(x, y, z, angle)
{
    var	wut_x;
    var wut_y;
    var wut_z;

    wut_x = x;
    wut_y = (Math.cos(angle) * y) - (Math.sin(angle) * z);
    wut_z = (Math.cos(angle) * y) - (Math.sin(angle) * z);
    return (wut_y);
}

function	rotation_y(x, y, z, angle)
{
    var wut_x;
    var wut_y;
    var wut_z;

    wut_x = (Math.cos(angle) * x) - (Math.sin(angle) * z);
    wut_y = y;
    wut_z = (Math.cos(angle) * x) - (Math.sin(angle) * z);
}
