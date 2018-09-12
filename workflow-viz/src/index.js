import { mxGraph, mxGraphModel, mxToolbar, mxDragSource, mxRubberband, mxKeyHandler, mxCell, mxGeometry, mxUtils } from 'mxgraph/javascript/mxClient';


window.onload = function () {

  function addToolbarItem(graph, toolbar, prototype, image) {
    // Function that is executed when the image is dropped on
    // the graph. The cell argument points to the cell under
    // the mousepointer if there is one.
    var funct = function (graph, evt, cell) {
      graph.stopEditing(false);
  
      var pt = graph.getPointForEvent(evt);
      var vertex = graph.getModel().cloneCell(prototype);
      vertex.geometry.x = pt.x;
      vertex.geometry.y = pt.y;
  
      graph.setSelectionCells(graph.importCells([vertex], 0, 0, cell));
    }
  
    // Creates the image which is used as the drag icon (preview)
    var img = toolbar.addMode(null, image, funct);
    mxUtils.makeDraggable(img, graph, funct);
  }
  
  function main() {
    var tbContainer = document.createElement('div');
    tbContainer.style.position = 'absolute';
    tbContainer.style.overflow = 'hidden';
    tbContainer.style.padding = '2px';
    tbContainer.style.left = '0px';
    tbContainer.style.top = '26px';
    tbContainer.style.width = '24px';
    tbContainer.style.bottom = '0px';
    document.body.appendChild(tbContainer);
    var toolbar = new mxToolbar(tbContainer);
    toolbar.enabled = false;

    var container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.overflow = 'hidden';
    container.style.left = '24px';
    container.style.top = '26px';
    container.style.right = '0px';
    container.style.bottom = '0px';
    container.style.background = 'url("images/grid.gif")';
    document.body.appendChild(container);
    // Creates the model and the graph inside the container
    // using the fastest rendering available on the browser
    var model = new mxGraphModel();
    var graph = new mxGraph(container, model);
    graph.dropEnabled = true;

    // Matches DnD inside the graph
    mxDragSource.prototype.getDropTarget = function (graph, x, y) {
      var cell = graph.getCellAt(x, y);
      if (!graph.isValidDropTarget(cell)) {
        cell = null;
      }
      return cell;
    };

    // Enables new connections in the graph
    graph.setConnectable(true);
    graph.setMultigraph(false);

    // Stops editing on enter or escape keypress
    var keyHandler = new mxKeyHandler(graph);
    var rubberband = new mxRubberband(graph);

    var addVertex = function (icon, w, h, style) {
      var vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
      vertex.setVertex(true);
      addToolbarItem(graph, toolbar, vertex, icon);
    };

    addVertex('images/rectangle.gif', 32, 32, '');
  }

  main();
};