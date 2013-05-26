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

    function getNode($data, $children) {
        $node = '<li><div>' . $data[2] . '</div>';
        if (!empty($children)) {
            $node .= '<ul>' . $children . '</ul>';
        }
        $node .= '</li>';
        return $node;
    }

    require_once 'Tree.php';
    $tree1 = new Tree($treeData);
    $tree2 = new Tree($treeData, 'getNode');
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
  <title>phpTree v2.0</title>
</head>
<style type="text/css">
  table {margin:100px auto;}
  td {border:1px solid silver; padding:10px;}
</style>
<body>
  <table>
    <tr><th>Tree without callback function</th><th>Tree using callback function</th></tr>
    <tr>
      <td><ul class="tree"><?php echo $tree1->get(); ?></ul></td>
      <td><ul class="tree"><?php echo $tree2->get(); ?></ul></td>
    </tr>

  </table>
</body>
</html>
