<?php 
    $treeData = array(
        array(1, 0, '1'),
        array(2, 1, '1.1'),
        array(3, 0, '2'),
        array(4, 1, '1.2'),
        array(5, 1, '1.3'),
        array(6, 4, '1.2.1'),
        array(7, 4, '1.2.2'),
        array(8, 4, '1.2.3'),
        array(9, 0, '3'),
        array(10, 9, '3.1'),
        array(11, 10, '3.1.1'),
        array(12, 11, '3.1.1.1'),
        array(13, 11, '3.1.1.2'),
        array(14, 11, '3.1.1.3'),
        array(15, 13, '3.1.1.2.1'),
    );

    function getNode($data) {
        $node = '<strong id="' . $data[1] . '">' . $data[2] . '</strong>';
        return $node;
    }

    require_once 'Tree.php';
    $tree1 = new Tree($treeData);
    $tree2 = new Tree($treeData, 'getNode');
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <title>phpTree v2.0</title>
  <link rel="stylesheet" type="text/css" href="tree.css" media="screen" />
  <script type="text/javascript" src="tree.js"></script>
</head>
<style type="text/css">
  table {margin:100px auto;}
  td {vertical-align:top; border:1px solid silver; padding:10px;}
</style>
<body>
  <table>
    <tr><th>Static Tree</th><th>Interactive Tree (using js)</th></tr>
    <tr>
      <td><div id="tree1"><?php echo $tree1->get(); ?></div></td>
      <td><div class="tree" id="tree2"><?php echo $tree2->get(); ?></div></td>
    </tr>
  </table>
</body>
<script>
    Tree('tree2');
</script>

</html>
