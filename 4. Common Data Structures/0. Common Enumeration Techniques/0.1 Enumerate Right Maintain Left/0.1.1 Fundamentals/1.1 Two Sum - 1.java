import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {

        // - Map：Java 的映射接口。
        // - HashMap：实现 Map 接口的一种类。
        // - Integer：Java 中 int 的包装类。
        // - idx：变量名称。
        // Map<Integer, Integer> 表示 Key 和 Value 都是整数类型。
        Map<Integer, Integer> idx = new HashMap<>();

        for (int j = 0; ; j++) { // i是下标
            int x = nums[j]; // x是数值

            if (idx.containsKey(target - x)) { // 判断是否有值
                return new int[]{idx.get(target - x), j}; //创建新的下标组
            }

            idx.put(x, j);
        }
    }
}

/*
1. HashMap 是什么？
可以把 HashMap 理解成一个存储**键值对（Key-Value）**的数据表。

在这道题中：
- Key：数组中的数字。
- Value：这个数字在数组中的下标。

idx.put(2, 0)	存储数字 2 和下标 0
idx.containsKey(2)	判断是否存在 Key 2
idx.get(2)	获取 Key 2 对应的下标

2. 为什么必须先查找，再存储？
由于题目中不能使用两次相同元素的要求。
正确顺序必须是：
1. 先检查 HashMap 中有没有需要的数字。
2. 找到则返回两个下标。
3. 没找到才保存当前数字。
这样就能确保查找的始终是之前出现过的元素。

*/

