---
title: 虚拟机扩展磁盘空间
author: liuzh
time: 2024-04-02
tag: 
 - vmvare
---

## vmvare 虚拟机 centos7 扩展磁盘空间

1. 在虚拟机设置中增加磁盘容量，重启系统
2. lsblk 可以看到磁盘空间已经增加  
   ![image](../.vuepress/public/images/vmvare-extend/lsblk.png)

3. fdisk /dev/sda 把新加的磁盘空间分区  
   fdisk -l 可以看到新加的分区  
   fdisk /dev/sda t 修改分区的类型为 Linux LVM  
   ![image](../.vuepress/public/images/vmvare-extend/fdisk.png)
4. mkfs.ext4 /dev/sda4 格式化  
   ![image](../.vuepress/public/images/vmvare-extend/mkfs.ext4.png)
5. pvcreate  
   ![image](../.vuepress/public/images/vmvare-extend/pvcreate.png)
6. vgextend  
   ![image](../.vuepress/public/images/vmvare-extend/vgextend.png)
7. lvextend -L +90G /dev/mapper/centos-root  
   ![image](../.vuepress/public/images/vmvare-extend/lvextend.png)
8. xfs_growfs  
   ![image](../.vuepress/public/images/vmvare-extend/xfs_growfs.png)