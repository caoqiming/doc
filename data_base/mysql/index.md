# index

查看索引
```sql
SHOW INDEX FROM <table_name>
```

返回的字段

- Table 表名
- Non_unique 0 表示唯一索引 （值不能重复）
- Key_name 索引名称，一个联合索引的各个子索引 Key_name 是相同的
- Seq_in_index 在联合索引中的顺序
- Column_name 索引的列名
- Collation 列以什么方式存储在索引中，大概意思就是字符序。
- Cardinality 表示索引中唯一值的数目的估计值。我们知道某个字段的重复值越少越适合建索引，所以我们一般都是根据Cardinality来判断索引是否具有高选择性，如果这个值非常小，那就需要重新评估这个字段是否适合建立索引
- Sub_part 前置索引的意思，如果列只是被部分地编入索引，则为被编入索引的字符的数目。如果整列被编入索引，则为NULL。
- Packed 指示关键字如何被压缩。如果没有被压缩，则为NULL。
- Null 如果列含有NULL，则含有YES
- Index_type 表示索引类型，Mysql目前主要有以下几种索引类型：FULLTEXT，HASH，BTREE，RTREE。

也可以通过建表语句更直观地看到索引

```sql
SHOW CREATE TABLE <table_name>;
```