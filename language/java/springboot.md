# springboot

- PO (Persistent Object): 持久化对象，用于表示数据库中的数据记录，通常与数据库表的结构相对应，以便进行 CRUD (创建、读取、更新、删除) 操作。
- VO (Value Object): 值对象，用于表示业务逻辑中的数据对象，通常用于在层之间传输数据。
- DAO (Data Access Object): 数据访问对象，用于封装数据访问逻辑，隐藏底层数据存储细节，提供一组操作数据的方法。
- BO (Business Object): 业务对象，用于封装业务逻辑，通常反映业务流程或业务实体。BO 可以使用 DAO 和 DTO 进行数据操作和传输。
- DTO (Data Transfer Object): 数据传输对象，用于在系统层之间传输数据，通常包含多个字段，可以用于批量传输数据。
- POJO (Plain Old Java Object): 简单的 Java 对象，是一个特定类型的类，没有任何限制或附加条件，可以用于表示各种数据。
