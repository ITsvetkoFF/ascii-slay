export class GridDimension {
  public height: number;
  public width: number;
  public hexSize: number;
  /**
   * Overal grid characteristics
   * @param height Height of a grid ingrid units (not asci symbols). Should be odd
   * @param width Width of a grid ingrid units (not asci symbols). Should be odd
   * @param hexSize Number of slashes needed to build 1 side of a hexagon.
   * Since number of underscores  is hexSize * 5 / 2 this can only be even
   */
  constructor(height: number, width: number, hexSize: number) {
    this.height = height;
    this.width = width;
    if (hexSize % 2 === 0 && hexSize !== 0) {
      this.hexSize = hexSize;
    } else {
      console.log('fallback to 2 for a hexSize since not even or invalid value is given');
      this.hexSize = 2;
    }
  }
}
