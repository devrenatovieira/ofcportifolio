import { Container } from "../components/Container";
import { GlowCard } from "../components/GlowCard";
import { SectionTitle } from "../components/SectionTitle";
import { Seo } from "../lib/Seo";

const articleIdeas = [
  "Como acelerar sites React com Vite para melhorar conversão",
  "Estratégias de SEO técnico para portfólios de desenvolvedores",
  "A importância do LCP e CLS em sites de apresentação profissional",
  "Como transformar casos de estudo em provas sociais que vendem",
  "Desenvolvimento frontend para mobile-first: resultados reais",
  "Quando usar React e Vite para projetos de landing pages rápidas",
  "Performance e UX: como criar interfaces que convertem visitantes em clientes",
  "Construindo landing pages de portfólio com foco em aquisição B2B",
  "Como organizar o fluxo de um portfólio para impressionar líderes de produto",
  "Backlinks para desenvolvedores: ganhe visibilidade com GitHub e LinkedIn"
];

export function Blog() {
  return (
    <section className="section">
      <Seo
        title="Blog de Frontend e Performance | Renato Vieira"
        description="Artigos sobre desenvolvimento frontend, React, Vite, performance e conversão para portfólios profissionais."
        url="https://ofcportifolio.com.br/blog"
        image="/portfolio-assets/images/dev.renato.png"
        type="article"
        article={{
          headline: "Blog de Frontend e Performance | Renato Vieira",
          description: "Artigos sobre desenvolvimento frontend, React, Vite, performance e conversão para portfólios profissionais.",
          datePublished: "2026-04-28"
        }}
      />
      <Container>
        <SectionTitle
          eyebrow="Blog"
          title="Conteúdo técnico para quem quer uma interface rápida, moderna e que traz clientes"
          text="Leia dicas práticas sobre performance, SEO em React, landing pages de conversão e estratégias para portfólios que vendem serviços."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {articleIdeas.map((idea) => (
            <GlowCard key={idea} className="p-6">
              <h3 className="text-lg font-black text-white">{idea}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Estrutura de artigo pronta para ranquear em buscas de quem procura desenvolvimento frontend, performance e conversão.
              </p>
            </GlowCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
