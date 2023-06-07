import { Expose } from 'class-transformer'
import { IFile } from '../interface/IFile'
import { AirModel } from '../model/AirModel'

/**
 * # 😄默认文件实体类
 * @author Hamm
 */
export class AirFileEntity extends AirModel implements IFile {
  @Expose() id!: number;

  @Expose() fileName!: string;

  @Expose() fileType!: string;

  @Expose() hashCode!: string;

  @Expose() size!: number;

  @Expose() url!: string;

  @Expose() createdTime!: number;
}
