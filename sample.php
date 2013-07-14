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
        $node = '<a id="' . $data[1] . '">' . $data[2] . '</a>';
        return $node;
    }

    require_once 'Tree.php';
    $tree1 = new Tree($treeData);
    $tree2 = new Tree($treeData, 'getNode');
?>
<!DOCTYPE html>
<html>
<head>
  <title>phpTree v2.0 Demo</title>
  <meta name="author" content="Mohsen Khahani" />
  <meta name="keywords" content="mohsen khahani, phpTree, interactive tree, php, javascript" />
  <meta name="description" content="phpTree is a simple interactive tree written in PHP/JavaScript." />
  <link rel="stylesheet" type="text/css" href="tree.css" media="screen" />
  <script type="text/javascript" src="tree.js"></script>
</head>
<style type="text/css">
  table {margin:100px auto 0 auto;}
  td {width:300px; vertical-align:top; border:1px solid silver; padding:10px;}
  #about {margin-top:20px; font:10px tahoma; line-height:1.6; color:#555; text-align:center;}
  #about a {text-decoration:none; border-bottom:1px dotted;}
</style>
<body>
  <table>
    <tr><th>Tree #1</th><th>Tree #2</th></tr>
    <tr>
      <td><div id="tree1" class="tree"><?php echo $tree1->get(); ?></div></td>
      <td><div id="tree2" class="tree"><?php echo $tree2->get(); ?></div></td>
    </tr>
  </table>
  <div id="about">
    <div><strong><a href="http://mohsenkhahani.ir/phpTree">phpTree</a></strong> v2.0</div>
    <div>&copy;2011-2013 <a href="http://mohsenkhahani.ir/" target="_blank">Mohsen Khahani</a></div>
  </div>
</body>
<script src="tree.js"></script>
<script>
    new Tree('tree1');
    new Tree('tree2');
</script>
</html>
