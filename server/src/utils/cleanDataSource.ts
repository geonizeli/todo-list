import { DataSource } from "typeorm";

export const cleanDataSource = async (
  dataSource: DataSource,
  entityNames: string[]
) => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error(
      `You tried to run a cleanDataSource into ${process.env.NODE_ENV} enviroment`
    );
  }

  await Promise.all(
    entityNames.map((tableName) => {
      return dataSource.query(`DELETE FROM "${tableName}";`);
    })
  );
};
