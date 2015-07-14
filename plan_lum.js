function        lum2(k, obj)
{
    spotx = 1000;
    spoty = 900;
    spotz = 0;
    x = obj.eye_x + k * obj.Vx;
    y = obj.eye_y + k * obj.Vy;
    z = obj.eye_z + k * obj.Vz;
    nrmx = x - 0;
    nrmy = y - 0;
    nrmz = z - 0;
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
    obj.anglep = ((nrmx * spotvx) + (nrmy * spotvy) + (nrmz * spotvz));
    obj.anglep *= -1;
}
