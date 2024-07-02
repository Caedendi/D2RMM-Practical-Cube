import { CubeWindowBuilder } from "./CubeWindowBuilder";
import { HingeRemover } from "./HingeRemover";

export class PracticalCubeMod {
  protected readonly cubeWindowBuilder: CubeWindowBuilder;
  protected readonly hingeRemover: HingeRemover;

  constructor() {
    this.cubeWindowBuilder = new CubeWindowBuilder();
    this.hingeRemover = new HingeRemover();
  }

  build() {
    this.cubeWindowBuilder.build();
    
    if (config.ShouldRemoveSidePanels) {
      this.hingeRemover.removeForHD();
      this.hingeRemover.removeForLowVision();
    }
  }
}
