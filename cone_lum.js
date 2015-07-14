function        lum4(k, obj)
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
    obj.angleccp = ((nrmx * spotvx) + (nrmy * spotvy) + (nrmz * spotvz));
    obj.angleccp *= -1;
}
