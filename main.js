function        put_pixel_to_img2(img, x_win, x, y, color)
{
    img.data[((y * x_win) + x) * 4] = color[0];
    img.data[((y * x_win) + x) * 4 + 1] = color[1];
    img.data[((y * x_win) + x) * 4 + 2] = color[2];
    img.data[((y * x_win) + x) * 4 + 3] = 255;
}

function        intersection(obj)
{
    var         x;
    var         y;
    var		norme;

    x = 0;
    y = 0;
    while (y != obj.win_y)
    {
        while (x != obj.win_x)
        {
	    obj.Vx = (obj.win_x / 2) - x;
	    obj.Vy = (obj.win_y / 2) - y;
	    obj.Vz = (obj.win_y / (2 * Math.tan(30 / 2)));
	    norme = Math.sqrt(obj.Vx * obj.Vx + obj.Vy * obj.Vy + obj.Vz * obj.Vz);
	    obj.Vx /= norme;
	    obj.Vy /= norme;
	    obj.Vz /= norme;
	    put_pixel_to_img2(obj.img, obj.win_x, x, y, calc(obj, x, y));
            x++;
        }
        x = 0;
        y++;
    }
    mlj_put_image_to_window(obj.win, obj.img, 0, 0);
}

function	calc(obj, x, y)
{
    var ak = {a : 0, b : 0, c : 0, d : -1}

    ak.a = sphere(obj);
    ak.b = interplan(obj, x, y);
    ak.c = intercone(500, obj);
    ak.d = intercylindre(500, obj);
    if ((ak.a != -1 && ak.a < ak.b && (ak.a < ak.c || y > 392) && 
	 (ak.a < ak.d || y > 397) || ak.a != -1 
	 && ak.b <= 0 && ak.c <= 0 && ak.d <= 0))
    {
	if (obj.angle > 0)
	{
	    return ([255 * obj.angle, 23 * obj.angle, 233 * obj.angle]);
	}
	else
	    return ([0, 0, 0]);
    }
    else if (ak.b > 0 && ak.b < ak.a && ak.b < ak.c || ak.a == -1 && ak.d == -1 && ak.d == -1 && ak.b > 0 || y > 397 && ak.a == -1)
	return ([0 * obj.anglep, 0 * obj.anglep, 255 * obj.anglep]);
    else if ((ak.c != -1 && ak.c < ak.a && ak.c < ak.b && ak.c < ak.d || ak.c != -1 && ak.b <= 0 && ak.c <= 0 && ak.d <= 0) && y < 397 /*+ obj.centercy*/ && y > 50 /*+ obj.centercy*/)
	return ([255 * obj.anglec, 0 * obj.anglec, 0  * obj.anglec]);
    else if ((ak.d != -1 && ak.d < ak.a && ak.d < ak.b && ak.d < ak.c || ak.d != -1 && ak.a <= 0 && ak.b <= 0 && ak.c <= 0) && y < 397 && y > 40)
	return ([0 * obj.angleccp, 255 * obj.angleccp, 0 * obj.angleccp]);
    else
	return ([34, 123, 123]);
}

function Math_radians(R)
{
    return (Math.PI * R / 180);
}

function        intercone(R, obj)
{
    a = Math.pow(obj.Vx, 2) + Math.pow(obj.Vz, 2) - (Math.pow(obj.Vy, 2) 
						     / (Math.tan(Math_radians(R)) * Math.tan(Math_radians(R))));
    b = 2 * (((obj.eye_x - obj.centercx) * obj.Vx) + ((obj.eye_z - obj.centercz) * obj.Vz) 
	     - ((obj.eye_y - obj.centercy) * obj.Vy / (Math.tan(Math_radians(R)) * Math.tan(Math_radians(R)))));
    c = Math.pow(obj.eye_x - obj.centercx, 2) + Math.pow(obj.eye_z - obj.centercz, 2) 
	- (Math.pow(obj.eye_y - obj.centercy, 2) / (Math.tan(Math_radians(R)) * Math.tan(Math_radians(R))));
    delta = (b * b) - (4 * (a * c));
    if (delta > 0)
    {
        k = (-b - Math.sqrt(delta)) / (2 * a);
        kd = (-b + Math.sqrt(delta)) / (2 * a);
        if (k > kd)
	{
	    lum3(kd, obj);
	    return (kd);
	}
        else
	    lum3(k, obj);
	return (k);

    }
    else if (delta == 0)
    {
	lum((-b / (2 * a)), obj);
        return (-b / (2 * a));
    }
    else
	return (-1);
}

function	interplan(obj, x, y)
{
    var	k;

    k = -(obj.eye_y / obj.Vy);
    lum2(k, obj);

    return (k);
}

function        lum(k, obj)
{
    spotx = obj.eye_x;
    spoty = obj.eye_y;
    spotz = obj.eye_z;
    x = obj.eye_x + k * obj.Vx;
    y = obj.eye_y + k * obj.Vy;
    z = obj.eye_z + k * obj.Vz;
    nrmx = x - obj.centerx;
    nrmy = y - obj.centery;
    nrmz = z - obj.centerz;
    norme = Math.sqrt(nrmx * nrmx + nrmy * nrmy + nrmz * nrmz);
    nrmx /= norme;
    nrmy /= norme;
    nrmz /= norme;
    spotvx = spotx - x;
    spotvy = spoty - y;
    spotvz = spotz - z;
    norme = Math.sqrt(spotvx * spotvx + spotvy * spotvy + spotvz * spotvz);
    spotvx /= norme;
    spotvy /= norme;
    spotvz /= norme;
    obj.angle = ((nrmx * spotvx) + (nrmy * spotvy) + (nrmz * spotvz));
    obj.angle *= -1;
}

function        sphere(obj)
{
    var		sp = {a : 0, b : 0, c : 0, delta : 0, k : 0, kd : 0};

    sp.a = (obj.Vx * obj.Vx) + (obj.Vy * obj.Vy) + (obj.Vz * obj.Vz);
    sp.b = 2 * (((obj.eye_x - obj.centerx) * obj.Vx) + ((obj.eye_y - obj.centery) * obj.Vy) 
		+ ((obj.eye_z - obj.centerz) * obj.Vz));
    sp.c = ((Math.pow(obj.eye_x - obj.centerx, 2) + Math.pow(obj.eye_y - obj.centery, 2) 
	  + Math.pow(obj.eye_z - obj.centerz, 2)) - Math.pow(obj.R, 2));
    sp.delta = (sp.b * sp.b) - (4 * (sp.a * sp.c));
    if (sp.delta > 0)
    {
        sp.k = (-sp.b - Math.sqrt(sp.delta)) / (2 * sp.a);
        sp.kd = (-sp.b + Math.sqrt(sp.delta)) / (2 * sp.a);
        if (sp.k > sp.kd)
	{
            lum(sp.kd, obj);
	    return (sp.kd);
	}
        else
	{
            lum(sp.k, obj);
	    return (sp.k);
	}
    }
    else
	return (-1);
}

function        intercylindre(R, obj)
{
    var		i = {a : 0, b : 0, c : 0, delta : 0, k : 0, kd : 0};

    i.a = (obj.Vx * obj.Vx) + (obj.Vz * obj.Vz);
    i.b = 2 * (((obj.eye_x - obj.centerccx) * obj.Vx) + ((obj.eye_z - obj.centerccz) * obj.Vz));
    i.c = Math.pow(obj.eye_x - obj.centerccx, 2) + Math.pow(obj.eye_z - obj.centerccz, 2) - (R * R);
    i.delta = (i.b * i.b) - (4 * (i.a * i.c));
    if (i.delta > 0)
    {
        i.k = (-i.b - Math.sqrt(i.delta)) / (2 * i.a);
        i.kd = (-i.b + Math.sqrt(i.delta)) / (2 * i.a);
        if (i.k > i.kd)
	    {
		lum4(i.kd, obj);
		return (i.kd);
	    }
        else
	    {
		lum4(i.k, obj);
		return (i.k);
	    }
    }
    else if (i.delta == 0)
	return (-i.b / (2 * i.a));
    else
	return (-1);
}

function Math_radians(R)
{
    return (Math.PI * R / 180);
}

function	main()
{
    var	obj = {eye_x : 0, eye_y : 50, eye_z : -6500, win_x : 1900, win_y : 800, 
	       Vx : 0, Vy : 0, Vz : 0, angle : 0,
	       anglep : 0, anglec : 0, angleccp : 0, centerx : 0, centery : 0, 
	       centerz : 0, R : 1400, centercx : 2000, centercy : 0, centercz : 0,
	       centerccx : -1700, centerccy : 0, centerccz : 0};
    mlj_init("Bonsoir Raytracer");
    obj.win = mlj_new_window(obj.win_x, obj.win_y, "Bonsoir Raytracer");
    obj.img = mlj_new_image(obj.win, obj.win_x, obj.win_y);
    intersection(obj);
}
