# 滑动窗口算法

简介
滑动窗口算法是一种用于解决数组或字符串相关算法问题的有效技术。它通过维护一个在数据结构上滑动的“窗口”来减少嵌套循环的需求，从而优化时间复杂度。滑动窗口不仅在算法题中经常使用，在我们的业务中也有用到，比如说“限流算法”就有基于滑动窗口来实现的。

![1]( /1.png "1.png")

我们写算法题时主要会用到二种不同类型的滑动窗口：定长 OR 不定长。

## 定长滑动窗口

核心思想

>以数组 **array** 为例，所谓定长滑动窗口意味着窗口内的元素数量始终为 C（常量）。在窗口滑动的过程中元素数量进出都是 X 个。可以把滑动理解为一个 Size 大小的窗口向右平移。
>
>一般来说，我们会使用 left、right 双指针来模拟窗口的移动过程，窗口大小:
>**𝐾 = 𝑟𝑖𝑔ℎ𝑡 − 𝑙𝑒𝑓𝑡 + 1**
>题目会给出来。
>
>其次我们还需要根据题目的要求维护窗口边界元素 **array[left]**、**array[right]**，以及窗口内元素 **array[left] array[left+1] ... array[right-1] array[right]** 的状态。这里的状态是指 **“边界元素的进、出是否需要更新？元素和是否小于 Max？字符数量是否满足要求等等”**。

总体来看，我们可以把整个窗口移动的过程分为三步：

1. “进”：下标为 `right` 的元素进入窗口，直到窗口元素数量等于 K。
2. “出”：下标为 `left` 的元素移出窗口，直到窗口元素数量等于 K。
3. “更新”：判断进、出窗口的元素是否满足题目条件，然后更新相关统计量。

以滑动窗口题单中的`定长子串中元音的最大数目`为例：

![2]( /2.png "2.png")

定长滑动窗口题目中，我觉得比较难的是如何把题目要求转换为基本的定长窗口滑动问题。

比如说，在有些题目中他要求我们从 **array** 的左右两端不断抽取元素，然后判断剩余元素是否满足要求。还有如何`重新安排会议得到最多空余时间I`这种。都是需要将一类抽象的问题转为我们熟悉的窗口移动问题。

Java 模板:

```java
class Solution {
    public int slidingWindow(int[] arr,int k) {
        int n = arr.length;
        // 统计量
        int cnt = 0;
        // 初始化窗口
        for (int i = 0; i < k; i ++) {
         // 判断arr[i]是否满足题目要求
         if (judge(arr[i])) {
          cnt ++;
         }
        }
        int max = cnt;
        // 窗口边界索引
        int l = 0;
        int r = k - 1;
        while(r + 1 < n) {
            // 出
            if(check(arr[l])) cnt --;
            // 进
            if(check(arr[r + 1])) cnt ++;
            // 更新结果值
            max = Math.max(max,cnt);
            l ++;
            r ++;
        }
        return max;
    }
}
```

在编写代码的时候，我会先初始化窗口，让逻辑窗口先有了 K 大小，然后我才会去进行窗口的滑动过程 **While(r + 1 < n){...}**。我觉得这样编码的时候思路清晰一些。

## 不定长滑动窗口

核心思想

以`无重复字符的最长子串`这题为例。
定长窗口的滑动一般都是进一个出一个：[abc]bca 移动一次变为 a[bcb]ca。
而不定长窗口的滑动一般都是连续进连续出：[abc]bca 移动一次遇到重复字符变为 ab[cb]ca（窗口内的字符非重复）。

>不定长滑动窗口一般是在外循环（窗口扩张）里又嵌入一层窗口收缩的内循环，以达到连续进/出的目的。
>
>比如说，只要 **array[right]** 这个字符始终不在窗口内，那么窗口就一直扩张下去，直到当前窗口存在 **array[right]** 这个字符。一旦出现重复字符，内循环就会不断移出窗口的 **array[left]** 字符，直到当前窗口不包含 **array[right]**。在这期间，只要满足题目要求，就更新一次统计量。

管理窗口内的元素我们通常会使用 HashSet、HashMap 去解决重复元素问题，有时候还会使用 diff/need 变量去记录差异。

![3]( /3.png "3.png")

如上图所示，符合题目要求的窗口长度可能很大，也可能很小。所以不定长滑动窗口的解可能是让我们 **求最长子数组 OR 求最短子数组**，而且题目一般会有 **「至多」OR 「至少」** 的要求。它们二者在代码编写上有些许区别（见后续模板）。

除了最长/最短外，还有一类问题是求合法子数组的个数。这类问题又可以衍生三种小问题

1. 窗口越长越合法
2. 窗口越短越合法
3. 窗口恰好满足条件

>对于窗口越长越合法，我的理解是一旦 [left,right] 这个子数组满足题目要求，那么 [left,right+1] [left,right+2] ... [left,n-1] 这些子数组也全都合法 ，所以更新统计量的时候不再是 cnt++ 而是 cnt += n - right（n 为数组长度）。
>
>同理对于窗口越短越合法，一旦 [left,right] 这个子数组符合题目要求，那么 [left,left] [left,left+1] ... [left,right - 1] 这些子数组也全都合法 ，更新统计量变为 cnt += right - left + 1。
>
>对于窗口恰好满足条件的子数组个数，以`和相同的二元子数组`这题为例。

题目：给你一个二元数组 nums（元素为0/1），和一个整数 goal ，请你统计并返回有多少个和等于 goal 的 非空 子数组。
对于该类问题，我们的求解可以和第1、2类问题相结合。

我们需要编写一个函数 `f(int[] nums, int target)` 求子数组和 `>= 𝑔𝑜𝑎𝑙` 以及子数组和 `>= 𝑔𝑜𝑎𝑙+1` 的非空子数组个数（‘窗口越长越合法’的求解过程）。子数组和等于goal 的个数就为 `cnt = f(nums,goal) - f(nums,goal+1)`。

不管是以上哪一类问题，最重要的就是维护窗口的状态，知道什么时候应该进/出元素，也就是窗口收缩的临界点（条件），最后更新统计量。

模板
>求最长子数组（`无重复字符的最长子串`）：

```java
class Solution {
    public int slidingWindow(String s) {
        char[] arr = s.toCharArray();
        int n = arr.length;
        // 窗口内不同类型字符的数量（窗口收缩的条件）
        int need = 0;
        int[] cnt = new int[3];
        int l = 0;
        int res = 0;
        for(int r = 0; r < n;r++){
         // 出现不同类型字符
            if( ++cnt[arr[r] - 'a'] == 1) need ++;
            while(need == 3) {
             // 更新结果值
                res += n - r;
                if(--cnt[arr[l] - 'a'] == 0) need --;
                l ++;
            }
        }
        return res;
    }
}
```

>求最短子数组（乘积小于 K 的子数组）：

```java
class Solution {
    public int slidingWindow(int[] nums, int k) {
        // [10] -> res += 1, [10]
        // [10,5] -> res += 2, [10,5]、[5]
        // [10,5,2] -> [5,2],res += 2, [5,2]、[2]
        // [5,2,6] -> res += 3, [5,2,6]、[2,6]、[6]
        if(k == 0) return 0;
        int n = nums.length;
        int res = 0;
        // 窗口内的乘积和
        int flag = 1;
        int l = 0;
        for(int r = 0; r < n; r++) {
            flag *= nums[r];
            // 窗口不满足要求->满足要求
            while(l <= r && flag >= k) {
                flag /= nums[l];
                l ++;
            }
            // 更新结果值
            res += r - l + 1;
        }
        return res;
    }
}
```

>求子数组个数（和相同的二元子数组）：

```java
class Solution {
    public int slidingWindow(int[] nums, int goal) {
        return f(nums,goal) - f(nums,goal + 1);
    }
    // 同求最长子数组个数
    public int f(int[] nums,int k) {
        int n = nums.length;
        int flag = 0;
        int l = 0;
        int res = 0;
        for(int r = 0; r < n; r ++) {
            flag += nums[r];
            while(l <= r && flag >= k) {
                res += n - r;
                flag -= nums[l];
                l++;
            }
        }
        return res;
    }
}
```

########################
