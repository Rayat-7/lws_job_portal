/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    let dummy =new ListNode(0);
    let tail=dummy;

    while(list1 && list2){
        if(list1.val <list2.val){
            tail.next=list1;
            list1=list1.next;
        }else{
            tail.next=list2;
            list2 =list2.next;

        }
        tail=tail.next;
    }
    tail.next=list1||list2;
    return dummy.next;
};


// Walkthrough Example
// Suppose:

// list1 = 1 -> 3 -> 5

// list2 = 2 -> 4 -> 6

// Dummy created (0 -> null), tail points to dummy.

// Compare 1 vs 2 → attach 1.

// Compare 3 vs 2 → attach 2.

// Compare 3 vs 4 → attach 3.

// Compare 5 vs 4 → attach 4.

// Compare 5 vs 6 → attach 5.

// Attach remainder (6).