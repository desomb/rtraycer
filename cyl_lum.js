function        lum3(k, obj)
{
    spotx = obj.eye_x;
    spoty = obj.eye_y;
    spotz = obj.eye_z;
    x = obj.eye_x + k * obj.Vx;
    y = obj.eye_y + k * obj.Vy;
    z = obj.eye_z + k * obj.Vz;
    nrmx = x - obj.centercx;
    nrmy = y - obj.centercy;
    nrmz = z - obj.centercz;
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
    obj.anglec = ((nrmx * spotvx) + (nrmy * spotvy) + (nrmz * spotvz));
    obj.anglec *= -1;
}
