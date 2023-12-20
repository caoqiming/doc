# MySQL 事务隔离级别

事务具有原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）四个特性，简称 ACID，缺一不可。这里讲的是隔离性。

## 概念说明

1. **脏读**
   脏读指的是读到了其他事务未提交的数据，未提交意味着这些数据可能会回滚，也就是可能最终不会存到数据库中，也就是不存在的数据。读到了并一定最终存在的数据，这就是脏读。

2. **可重复读**
   可重复读指的是在一个事务内，最开始读到的数据和事务结束前的任意时刻读到的同一批数据都是一致的。通常针对数据更新（UPDATE）操作。

3. **不可重复读**
   对比可重复读，不可重复读指的是在同一事务内，不同的时刻读到的同一批数据可能是不一样的，可能会受到其他事务的影响，比如其他事务改了这批数据并提交了。通常针对数据更新（UPDATE）操作。

4. **幻读** （phantom row problems）
   幻读是针对数据插入（INSERT）操作来说的。假设事务 A 对某些行的内容作了更改，但是还未提交，此时事务 B 插入了与事务 A 更改前的记录相同的记录行，并且在事务 A 提交之前先提交了，而这时，在事务 A 中查询，会发现好像刚刚的更改对于某些数据未起作用，但其实是事务 B 刚插入进来的，让用户感觉很魔幻，感觉出现了幻觉，这就叫幻读。

对于一个快照来说，它能够读到那些版本数据，要遵循以下规则：

- 当前事务内的**更新**，可以读到；
- 版本未提交，不能读到；
- 版本已提交，但是却在快照创建后提交的，不能读到；
- 版本已提交，且是在快照创建前提交的，可以读到；

## 事务隔离级别

SQL 标准定义了四种隔离级别，MySQL 全都支持。这四种隔离级别分别是：

1. **读未提交**（READ UNCOMMITTED）
2. **读提交** （READ COMMITTED）
3. **可重复读** （REPEATABLE READ）
4. **串行化** （SERIALIZABLE）

|          | 脏读 | 不可重复读 | 幻读 |
| :------: | :--: | :--------: | :--: |
| 读未提交 |      |            |      |
|  读提交  |  ❌  |            |      |
| 可重复读 |  ❌  |     ❌     |  ？  |
|  串行化  |  ❌  |     ❌     |  ❌  |

InnoDB 的默认隔离级别是可重复读（REPEATABLE READ）, mysql 的可重复读解决了幻读。
事务的执行过程，以 begin 或者 start transaction 开始，然后执行一系列操作，最后要执行 commit 或 rollback 操作，事务才算结束。需要注意的是，begin 命令并不代表事务的开始，事务开始于 begin 命令之后的第一条语句执行的时候。

### 读未提交（READ UNCOMMITTED）

### 读提交（READ COMMITTED）

每次执行语句的时候都重新生成一次快照。一个事务只能读到其他事务已经提交过的数据。
在事务 A 中使用 update 语句将 id=1 的记录行 age 字段改为 10。此时，在事务 B 中使用 select 语句进行查询，我们发现在事务 A 提交之前，事务 B 中查询到的记录 age 一直是 1，直到事务 A 提交，此时在事务 B 中 select 查询，发现 age 的值已经是 10 了。（不可重复读）

再举个例子，有张 user 表其中 id 为 1 的数据的 age 字段为 3

1. 事务 A 将 user 表中 id 为 1 的 age 字段设置为 4
2. 事物 B 此时读取 id 为 1 的数据，得到的 age 为 3
3. 事务 B 将 user 表中 id 为 1 的 age 字段设置为 5，此时事务 B 会 hang 住。(事务 A 加了行锁)
4. 事务 A 此时读取 id 为 1 的数据，得到的 age 为 4
5. 事务 A commit，此时事务 B 从 hang 住的状态恢复
6. 此时在事务外查询 id 为 1 的数据 age 为 4，事务 B 中查询结果为 5
7. 事务 B commit
8. 读取 id 为 1 的数据，得到的 age 为 5

### 可重复读 （REPEATABLE READ）

事务开始的时候生成一个当前事务全局性的快照。事务开始时读到的**已有**数据是什么，在事务提交前的任意时刻，这些数据的值都是一样的。但是，对于其他事务**新插入**的数据是可以读到的。(亲测 mysql，新插入的数据读不到)

举个例子，虽然读不到其他事务的 commit，但是会影响 update 的结果

1. 事务 A 将 user 表中 id 为 1 的 age 字段设置为 3（原本是 5）
2. 事务 B begin
3. 事务 A commit
4. 事务 B 读取 id 为 1 的 age 字段还是 5
5. 事务 B 将 age 为 5 的 age 改为 1，没有行被影响
6. 事务 B 将 id 为 1 的 age 改为 1，修改成功

update 会导致 insert hang 住，比如`update user set name="a" where age = 10`因为 age 没有加索引，会给所有的数据上行锁，如果 age 加了索引则只加间隙锁。可能会导致其他事务的 insert hang 住。

For locking reads (SELECT with FOR UPDATE or FOR SHARE), UPDATE statements, and DELETE statements, InnoDB locks only index records, not the gaps before them, and thus permits the free insertion of new records next to locked records. Gap locking is only used for foreign-key constraint checking and duplicate-key checking.

- For UPDATE or DELETE statements, InnoDB holds locks only for rows that it updates or deletes. Record locks for nonmatching rows are released after MySQL has evaluated the WHERE condition. This greatly reduces the probability of deadlocks, but they can still happen.
- For UPDATE statements, if a row is already locked, InnoDB performs a “semi-consistent” read, returning the latest committed version to MySQL so that MySQL can determine whether the row matches the WHERE condition of the UPDATE. If the row matches (must be updated), MySQL reads the row again and this time InnoDB either locks it or waits for a lock on it.

## 相关命令

```SQL
--查看当前数据库隔离级别
SELECT @@tx_isolation;
--设置数据库隔离级别，设置完后需要重新连接
set global transaction isolation level read committed;
--查询当前有多少事务正在运行
select * from information_schema.innodb_trx;
```
