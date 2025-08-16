'use client';

import { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Globe, Settings, FileText, Zap, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface LayerItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  dependencies?: string[];
  code: string;
}

const availableLayers: LayerItem[] = [
  {
    id: 'config',
    name: 'Configuration',
    description: 'App settings and environment variables',
    icon: <Settings className="w-5 h-5" />,
    color: 'bg-purple-500',
    code: 'ZLayer.fromResource(Config.load)',
  },
  {
    id: 'database',
    name: 'Database',
    description: 'PostgreSQL connection pool',
    icon: <Database className="w-5 h-5" />,
    color: 'bg-blue-500',
    dependencies: ['config'],
    code: 'ZLayer.fromZIO(DatabasePool.make)',
  },
  {
    id: 'http-client',
    name: 'HTTP Client',
    description: 'HTTP client for external APIs',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-green-500',
    dependencies: ['config'],
    code: 'ZLayer.succeed(HttpClient.live)',
  },
  {
    id: 'logger',
    name: 'Logger',
    description: 'Structured logging service',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-yellow-500',
    dependencies: ['config'],
    code: 'ZLayer.fromZIO(Logger.make)',
  },
  {
    id: 'user-service',
    name: 'User Service',
    description: 'Business logic for user operations',
    icon: <Zap className="w-5 h-5" />,
    color: 'bg-indigo-500',
    dependencies: ['database', 'logger'],
    code: 'ZLayer.fromFunction(UserService.live _)',
  },
  {
    id: 'api-server',
    name: 'API Server',
    description: 'HTTP routes and endpoints',
    icon: <Globe className="w-5 h-5" />,
    color: 'bg-red-500',
    dependencies: ['user-service', 'http-client'],
    code: 'ZLayer.fromFunction(ApiServer.live _)',
  },
];

interface DraggableLayerProps {
  layer: LayerItem;
  isInPalette: boolean;
}

const DraggableLayer = ({ layer, isInPalette }: DraggableLayerProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'layer',
    item: { layer, isInPalette },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag as any}
      className={cn(
        "relative p-4 rounded-xl border-2 cursor-move transition-all shadow-lg",
        isDragging && "opacity-50 scale-95",
        isInPalette
          ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600"
          : "bg-white dark:bg-gray-800 border-primary-300 dark:border-primary-600"
      )}
      whileHover={{ scale: isDragging ? 0.95 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={cn("p-2 rounded-lg text-white", layer.color)}>
          {layer.icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
            {layer.name}
          </h4>
        </div>
      </div>
      
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        {layer.description}
      </p>
      
      <div className="bg-gray-900 rounded px-2 py-1">
        <code className="text-xs text-green-400 font-mono">
          {layer.code}
        </code>
      </div>

      {!isInPalette && layer.dependencies && (
        <div className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
          ✓
        </div>
      )}
    </motion.div>
  );
};

interface DropZoneProps {
  onDrop: (layer: LayerItem) => void;
  layers: LayerItem[];
  onRemove: (layerId: string) => void;
}

const DropZone = ({ onDrop, layers, onRemove }: DropZoneProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'layer',
    drop: (item: { layer: LayerItem; isInPalette: boolean }) => {
      if (item.isInPalette && !layers.find(l => l.id === item.layer.id)) {
        onDrop(item.layer);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getLayerErrors = (layer: LayerItem): string[] => {
    const errors = [];
    if (layer.dependencies) {
      for (const dep of layer.dependencies) {
        if (!layers.find(l => l.id === dep)) {
          const depLayer = availableLayers.find(l => l.id === dep);
          errors.push(`Missing dependency: ${depLayer?.name || dep}`);
        }
      }
    }
    return errors;
  };

  return (
    <div
      ref={drop as any}
      className={cn(
        "min-h-[400px] p-6 border-2 border-dashed rounded-2xl transition-all",
        isOver 
          ? "border-primary-400 bg-primary-50 dark:border-primary-600 dark:bg-primary-950/20" 
          : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50"
      )}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Your Application Stack
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drag layers here to build your ZIO application
        </p>
      </div>

      {layers.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-2">🏗️</div>
            <p>Start building by dragging layers here</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {layers.map((layer, index) => {
              const errors = getLayerErrors(layer);
              return (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <DraggableLayer layer={layer} isInPalette={false} />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(layer.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      Remove
                    </Button>
                  </div>
                  
                  {errors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        <div className="text-red-500 text-sm">⚠️</div>
                        <div>
                          {errors.map((error, i) => (
                            <div key={i} className="text-sm text-red-700 dark:text-red-300">
                              {error}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default function LayerBuilder() {
  const [selectedLayers, setSelectedLayers] = useState<LayerItem[]>([]);

  const addLayer = (layer: LayerItem) => {
    setSelectedLayers(prev => [...prev, layer]);
  };

  const removeLayer = (layerId: string) => {
    setSelectedLayers(prev => prev.filter(l => l.id !== layerId));
  };

  const clearAll = () => {
    setSelectedLayers([]);
  };

  const buildApp = () => {
    // Animation or success state could go here
    console.log('Building app with layers:', selectedLayers);
  };

  const hasErrors = selectedLayers.some(layer => {
    if (!layer.dependencies) return false;
    return layer.dependencies.some(dep => !selectedLayers.find(l => l.id === dep));
  });

  const availableForPalette = availableLayers.filter(
    layer => !selectedLayers.find(selected => selected.id === layer.id)
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Drag and drop to see how ZIO's dependency injection works. 
            Notice how dependencies are automatically resolved!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Layer Palette */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Available Layers
            </h3>
            <div className="space-y-3">
              {availableForPalette.map(layer => (
                <DraggableLayer
                  key={layer.id}
                  layer={layer}
                  isInPalette={true}
                />
              ))}
            </div>
          </div>

          {/* Drop Zone */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Application Builder
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  disabled={selectedLayers.length === 0}
                >
                  Clear All
                </Button>
                <Button
                  size="sm"
                  onClick={buildApp}
                  disabled={selectedLayers.length === 0 || hasErrors}
                  icon={<CheckCircle className="w-4 h-4" />}
                >
                  Build App
                </Button>
              </div>
            </div>
            
            <DropZone
              onDrop={addLayer}
              layers={selectedLayers}
              onRemove={removeLayer}
            />
          </div>
        </div>

        {/* Generated Code */}
        {selectedLayers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-xl overflow-hidden"
          >
            <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
              <h3 className="font-mono text-sm text-gray-300">Generated ZIO Application</h3>
            </div>
            
            <div className="p-6">
              <pre className="text-sm text-gray-300 leading-relaxed">
                <code>{`object MyApp extends ZIOApp {
  
  // Layer definitions
${selectedLayers.map(layer => `  val ${layer.id}Layer = ${layer.code}`).join('\n')}

  // Compose all layers
  val appLayer = ${selectedLayers.map(l => `${l.id}Layer`).join(' >>> ')}

  // Your application logic
  val program = for {
    _ <- ZIO.log("Starting application...")
    ${selectedLayers.includes(availableLayers.find(l => l.id === 'user-service')!) 
      ? '_ <- UserService.createUser("john@example.com")' 
      : '// Add business logic here'}
  } yield ()

  def run = program.provide(appLayer)
}`}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* Explanation */}
        <div className="bg-primary-50 dark:bg-primary-950/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            🧠 How ZIO Layers Work
          </h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Dependency Injection</h5>
              <p className="text-gray-600 dark:text-gray-300">
                ZIO automatically figures out the dependency graph. If UserService needs Database and Logger, 
                ZIO ensures they're created in the right order and provided when needed.
              </p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Resource Management</h5>
              <p className="text-gray-600 dark:text-gray-300">
                Each layer handles its own lifecycle. Database connections are properly closed, 
                HTTP clients are shut down gracefully, and resources are cleaned up automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}